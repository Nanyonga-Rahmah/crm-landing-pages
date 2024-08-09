'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  AddNewProposal,
  GetLeadsByOrganization,
  GetProductsByOrganization,
} from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { ILeads } from '../Tables/LeadsTable';

const formSchema = z.object({
  lead: z.string().min(1, { message: 'Lead is required' }),
  service: z.string().min(1, { message: 'Service is required' }),
  monthlyCost: z
    .number()
    .min(0, { message: 'Monthly cost must be 0 or greater' }),
  installationFees: z
    .number()
    .min(0, { message: 'Installation fees must be 0 or greater' }),
  dateSent: z.string().min(1, { message: 'Date sent is required' }),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type ProposalFormProps = {
  onClose: () => void;
};

export function AddProposalForm({ onClose }: ProposalFormProps) {
  const OrgId = localStorage.getItem('OrganizationId');
  const token = localStorage.getItem('AccessToken');
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(GetProductsByOrganization, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': `${OrgId}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        const filteredProducts = data?.data?.products
          .filter(
            (product: { category: string }) =>
              product.category === 'ENTERPRISE' ||
              product.category === 'SOLUTIONS'
          )
          .map((product: { id: string; name: string }) => ({
            id: product.id,
            name: product.name,
          }));
        setProducts(filteredProducts);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error occurred');
        }
      }
    };
    fetchProducts();
  }, [OrgId]);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!OrgId) return;

      try {
        const response = await fetch(GetLeadsByOrganization, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': `${OrgId}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }

        const data = await response.json();
        if (!data || !data.data || !Array.isArray(data.data.leads)) {
          throw new Error('Invalid data format');
        }

        const filteredLeads = data.data.leads.filter(
          (lead: ILeads) => lead.leadStatus === 'LEAD'
        );

        setLeads(filteredLeads);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [OrgId]);

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);

    try {
      const formattedData = {
        leadId: values.lead,
        productId: values.service,
        proposedPrice: values.monthlyCost,
        installationPrice: values.installationFees,
        additionalInformation: values.additionalInfo || null,
        proposalDate: new Date(values.dateSent).toISOString(),
        proposalTarget: null,
      };

      const response = await fetch(AddNewProposal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'organization-id': `${OrgId}`,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add proposal');
      }

      toast.success('Proposal added successfully', {
        style: {
          backgroundColor: '#e6ffed',
          color: 'green',
          border: '1px solid green',
        },
      });

      setTimeout(() => {
        form.reset();
        onClose();
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          style: {
            backgroundColor: '#ffe6e6',
            color: 'red',
            border: '1px solid red',
          },
        });
      } else {
        toast.error('An unknown error occurred', {
          style: {
            backgroundColor: '#ffe6e6',
            color: 'red',
            border: '1px solid red',
          },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 w-full  min-h-max p-4 overflow-auto "
        >
          <FormField
            control={form.control}
            name="lead"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lead</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a lead" />
                    </SelectTrigger>
                    <SelectContent>
                      {leads.length > 0 ? (
                        leads.map((lead) => (
                          <SelectItem key={lead.id} value={lead.id}>
                            {lead.firstName ||
                              lead.businessName ||
                              'Unnamed Lead'}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-leads" disabled>
                          No Leads Available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="monthlyCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="installationFees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Installation Fees</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="dateSent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Sent</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Adding proposal...' : 'Add proposal'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
