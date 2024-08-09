'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { CreateVisit, GetLeadsByOrganization } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { ILeads } from '../Tables/LeadsTable';

const FormSchema = z.object({
  visitDate: z.string().min(2, {
    message: 'Field is Required.',
  }),

  visitType: z.string().min(2, {
    message: 'Field is Required.',
  }),
  location: z.string().optional(),
  firstName: z.string().optional(),
  leadEmail: z.string().optional(),
  phoneNumber: z.string().optional(),
  leadId: z.string().optional(),
  additionalInformation: z.string().min(2, {
    message: 'Field is Required.',
  }),
  businessType: z.string(),
});

export function HomeVisit({ onClose }: { onClose: () => void }) {
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [leadIdInput, setLeadIdInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const organizationId = localStorage.getItem('OrganizationId');
      setOrgId(organizationId);
    }
  }, []);

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
          (lead: ILeads) => lead.businessType === 'HOME'
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
  }, [OrgId, leads]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      visitDate: '',
      firstName: '',
      leadEmail: '',
      phoneNumber: '',
      visitType: '',
      location: '',
      additionalInformation: '',
      businessType: 'Home',
    },
  });

  const leadId = form.watch('leadId');
  const firstName = form.watch('firstName');
  const visitType = form.watch('visitType');

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);

    if (typeof values.visitDate === 'string') {
      const date = new Date(values.visitDate);
      const isoDate = date.toISOString();
      values.visitDate = isoDate;
    }

    const OrgId = localStorage.getItem('OrganizationId');
    const token = localStorage.getItem('AccessToken');
    const payload: Record<string, any> = {
      ...values,
    };

    if (values.firstName) {
      delete payload.leadId;
    }

    try {
      const response = await fetch(CreateVisit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'organization-id': `${OrgId}`,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error, {
          style: {
            backgroundColor: '#FFE6E6',
            color: 'red',
            border: '1px solid red',
          },
        });
      } else {
        setTimeout(() => {
          toast.success(data.message, {
            style: {
              backgroundColor: '#E6FFED',
              color: 'green',
              border: '1px solid green',
            },
          });
          form.reset();

          onClose();
        }, 1000);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Disconnected, Connect to the Internet to Continue', {
          style: {
            backgroundColor: '#FFE6E6',
            color: 'red',
            border: '1px solid red',
          },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className="grid h-96">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col md:grid grid-cols-2 gap-5 pb-5 pt-2 px-5 "
        >
          <FormField
            control={form.control}
            name="visitType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visit Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select the Visit Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Visit Types</SelectLabel>
                        <SelectItem value="new">New Visit</SelectItem>
                        <SelectItem value="follow_up">Follow Up</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visitDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="Time"
                    {...field}
                    className="w-full p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="leadId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Existing Prospect</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={!!firstName}>
                      <div className="flex items-center justify-between p-2 border rounded-xl cursor-pointer">
                        <div className="flex flex-wrap gap-2 overflow-x-hidden">
                          <span className="text-gray-500 text-xs">
                            {leadIdInput || 'Select Existing Name'}
                          </span>
                        </div>
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Contact Names</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {leads.map((lead: ILeads) => (
                        <DropdownMenuItem
                          key={lead.id}
                          onSelect={() => {
                            setLeadIdInput(lead.firstName ?? '');
                            field.onChange(lead.id);
                          }}
                        >
                          {lead.firstName} {lead.lastName}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onSelect={() => {
                          setLeadIdInput('');
                          field.onChange('');
                        }}
                      >
                        Clear Selection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Prospect</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New Contact"
                    disabled={!!leadId || visitType === 'follow_up'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New Contact Phone Number"
                    disabled={!!leadId || visitType === 'follow_up'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="leadEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New Contact Email"
                    type="email"
                    disabled={!!leadId || visitType === 'follow_up'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInformation"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Additional Information/Feedback</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional Information/Feedback"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-2" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
