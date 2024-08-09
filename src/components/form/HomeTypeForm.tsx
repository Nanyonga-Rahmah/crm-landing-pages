import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { AddLead, GetProductsByOrganization } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  title: z.string().optional(),
  businessType: z.string().optional(),
  businessName: z.string().optional(),
  leadStatus: z.string().optional(),
  contactPerson: z.string().optional(),
  secondaryContactPerson: z.string().optional(),
  secondaryContactNumber: z.string().optional(),
  secondaryContactEmail: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  leadEmail: z.string().email().optional(),
  numberOfBranches: z.number().optional(),
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  products: z.array(z.string()).optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

type HomeFormProps = {
  type: 'Client' | 'Prospect';
  bType: 'HOME' | 'ENTERPRISE' | 'SOLUTIONS';
  onClose: () => void;
};

export function HomeTypeForm({ type, onClose, bType }: HomeFormProps) {
  const [loading, setLoading] = useState(false);
  const OrgId = localStorage.getItem('OrganizationId');
  const token = localStorage.getItem('AccessToken');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);

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
            (product: { category: string }) => product.category === 'HOME'
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
  }, [OrgId, token]);

  const handleSelectedChange = (id: string) => {
    if (selectedValues.includes(id)) {
      setSelectedValues(selectedValues.filter((v) => v !== id));
    } else {
      setSelectedValues([...selectedValues, id]);
    }
  };

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      businessType: (bType = 'HOME'),
      leadStatus: type === 'Client' ? 'CLOSED' : 'PROSPECT',
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    values.products = selectedValues;

    try {
      const response = await fetch(AddLead, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'organization-id': `${OrgId}`,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.error || 'An error occurred';
        toast.error(errorMessage, {
          style: {
            backgroundColor: '#ffe6e6',
            color: 'red',
            border: '1px solid red',
          },
        });
      } else if (responseData.success) {
        const successMessage =
          type === 'Client'
            ? 'Client added successfully'
            : 'Prospect added successfully';
        toast.success(successMessage, {
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
      }
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
      setLoading(false);
    }
  }

  return (
    <ScrollArea className="grid h-80">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 w-full  min-h-max p-4 overflow-auto "
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">
                  Middle Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Middle Name"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    className="rounded-xl text-xs"
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
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="products"
            render={() => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">
                  Service(s)
                </FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center justify-between p-2 border rounded-xl cursor-pointer">
                        <div className="flex flex-wrap gap-2 overflow-x-hidden">
                          {selectedValues.length > 0 ? (
                            selectedValues.map((id) => {
                              const product = products.find((p) => p.id === id);
                              return (
                                <div
                                  key={id}
                                  className="flex bg-slate-200 text-xs flex-row text-black rounded-sm items-center p-1"
                                >
                                  <span>{product?.name}</span>
                                </div>
                              );
                            })
                          ) : (
                            <span className="text-gray-500 text-xs">
                              Select service(s)
                            </span>
                          )}
                        </div>
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {products.map((product) => (
                        <DropdownMenuCheckboxItem
                          key={product.id}
                          checked={selectedValues.includes(product.id)}
                          onCheckedChange={() =>
                            handleSelectedChange(product.id)
                          }
                        >
                          {product.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Location"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondaryContactPerson"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">
                  Secondary Contact Person
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contact person"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondaryContactEmail"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">
                  Secondary Contact Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contact Email"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondaryContactNumber"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel className="text-l font-semibold">
                  Secondary Contact Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contact Number"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid sm:col-span-2">
                <FormLabel className="text-l font-semibold">
                  Additional Information
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional Information"
                    {...field}
                    className="rounded-xl text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid sm:col-span-2">
            <Button type="submit" className="h-10" disabled={loading}>
              {loading
                ? type === 'Client'
                  ? 'Adding Client...'
                  : 'Adding Prospect...'
                : type === 'Client'
                  ? 'Add Client'
                  : 'Add Prospect'}
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}

export default HomeTypeForm;
