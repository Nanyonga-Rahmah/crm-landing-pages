'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { CreateSale, GetProductsByOrganization } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Textarea } from '@/components/ui/textarea';

type ClosedProps = {
  leadId?: string;
  onClose: () => void;
  businessType?: string;
};

const formSchema = z.object({
  description: z.string().min(2, {
    message: 'required',
  }),
  productId: z.string().optional(),
  quantity: z.number().min(1, {
    message: 'required',
  }),
  unitPrice: z.number().min(1).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ClosedForm({ leadId, onClose, businessType }: ClosedProps) {
  const [loading, setLoading] = useState(false);
  const OrgId = localStorage.getItem('OrganizationId');
  const token = localStorage.getItem('AccessToken');
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
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
            (product: { category: string }) => product.category === businessType
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
  }, [OrgId, businessType]);

  const handleSelectedChange = (id: string) => {
    setSelectedValue(id);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function changeStatus(values: FormData) {
    if (!selectedValue) {
      toast.error('Please select a product', {
        style: {
          backgroundColor: '#ffe6e6',
          color: 'red',
          border: '1px solid red',
        },
      });
      return;
    }

    values.productId = selectedValue;
    setLoading(true);

    try {
      const response = await fetch(CreateSale(leadId), {
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
        const successMessage = 'Status changed successfully';
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
          window.location.reload();
        }, 500);
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

  function onSubmit(values: FormData) {
    if (selectedValue) {
      values.productId = selectedValue;
      changeStatus(values);
    } else {
      form.setError('productId', {
        type: 'manual',
        message: 'Please select a product',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="productId"
          render={() => (
            <FormItem className="grid lg:col-span-2">
              <FormLabel className="text-l font-semibold">Service</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between p-2 border rounded-xl cursor-pointer">
                      <div className="flex flex-wrap gap-2 overflow-x-hidden">
                        {selectedValue ? (
                          <div
                            key={selectedValue}
                            className="flex text-xs flex-row text-black items-center"
                          >
                            <span>
                              {
                                products.find((p) => p.id === selectedValue)
                                  ?.name
                              }
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">
                            Select service
                          </span>
                        )}
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {products.map((product) => (
                      <DropdownMenuItem
                        key={product.id}
                        onSelect={() => handleSelectedChange(product.id)}
                      >
                        {product.name}
                      </DropdownMenuItem>
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
          name="quantity"
          render={({ field }) => (
            <FormItem className="grid">
              <FormLabel className="text-l font-semibold">
                Number of Months
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                  placeholder="Enter number of months"
                  className="rounded-xl text-xs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={200000}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for status change</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the reason for status change"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mb-2 mt-4">
          {loading ? 'Changing status...' : 'Change status'}
        </Button>
      </form>
    </Form>
  );
}

export default ClosedForm;
