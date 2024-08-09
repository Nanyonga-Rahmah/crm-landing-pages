'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { SetTarget } from '@/lib/api_routes';

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
  sales: z.number().min(0, {
    message: 'Sales must be a non-negative number',
  }),
  visits: z.number().min(0, {
    message: 'Visits must be a non-negative number',
  }),
  proposals: z.number().min(0, {
    message: 'Proposals must be a non-negative number',
  }),
  qualifiedLeads: z.number().min(0, {
    message: 'Qualified leads must be a non-negative number',
  }),
});

type FormData = z.infer<typeof formSchema>;

export function SetTargetForm({ onClose }: { onClose: () => void }) {
  const OrgId = localStorage.getItem('OrganizationId');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(SetTarget, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'organization-id': `${OrgId}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to set target');
      }
      const data = await response.json();

      toast.success('Target set successfully', {
        style: {
          backgroundColor: '#E6FFED',
          color: 'green',
          border: '1px solid green',
        },
      });
      console.log('Data: ', data);
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="sales"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sales Target</FormLabel>
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
            name="visits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visits Target</FormLabel>
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
            name="proposals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposals Target</FormLabel>
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
            name="qualifiedLeads"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualified Leads Target</FormLabel>
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
          <div className="flex w-full">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Setting Target...' : 'Set Target'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
