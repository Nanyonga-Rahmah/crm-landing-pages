'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Createproduct } from '@/lib/api_routes';

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

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'required',
  }),
  unitPrice: z.number().min(1, {
    message: 'required',
  }),
  category: z.string().min(2, {
    message: 'required',
  }),
  description: z.string().min(2, {
    message: 'required',
  }),
});
type FormData = z.infer<typeof formSchema>;
export function AddProductForm({ onClose }: { onClose: () => void }) {
  const OrgId = localStorage.getItem('OrganizationId');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      name: '',
      unitPrice: undefined,
      description: '',
    },
  });

  const handleSubmit = (values: FormData) => {
    const SubmitProduct = async () => {
      setIsSubmitting(true);

      try {
        const response = await fetch(Createproduct, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': `${OrgId}`,
          },
          body: JSON.stringify(form.getValues()),
        });

        if (!response.ok) {
          toast.error('Failed to create product', {
            style: {
              backgroundColor: '#E6FFED',
              color: 'green',
              border: '1px solid green',
            },
          });
        }
        toast.success('Product added successfully', {
          style: {
            backgroundColor: '#E6FFED',
            color: 'green',
            border: '1px solid green',
          },
        });
        form.reset();
        onClose();
      } catch (error) {
        toast.error((error as Error).message, {
          style: {
            backgroundColor: '#FFE6E6',
            color: 'red',
            border: '1px solid red',
          },
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    SubmitProduct();

    setSubmitSuccess(true);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                      <SelectItem value="HOME">Home</SelectItem>
                      <SelectItem value="SOLUTIONS">
                        {' '}
                        Custom Solutions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product name"
                    {...field}
                    className="rounded-xl"
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
                    min={1}
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Add'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
