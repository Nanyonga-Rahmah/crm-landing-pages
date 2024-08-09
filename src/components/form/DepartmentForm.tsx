'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { CreateDepartment } from '@/lib/api_routes';

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

const formSchema = z.object({
  name: z.string().nonempty('Department name is required'),
  description: z.string().nonempty('Description is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function DepartmentForm({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const OrgId = localStorage.getItem('OrganizationId');
  const token = localStorage.getItem('AccessToken');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    console.log(values);
    try {
      const response = await fetch(CreateDepartment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'organization-id': `${OrgId}`,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      console.log('Response :', response);
      console.log('Response.json', response.json());

      if (!response.ok) {
        throw new Error('Failed to create department');
      }

      toast.success('Department created successfully', {
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

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Name</FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-md" />
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
                  <Input {...field} className="rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Creating...' : 'Create Department'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
