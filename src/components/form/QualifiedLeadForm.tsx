'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ChangeStatus } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

type QualifiedLeadProps = {
  leadId?: string;
  onClose: () => void;
};

const formSchema = z.object({
  description: z.string().min(2, {
    message: 'Required',
  }),
  leadStatus: z.string().min(2, {
    message: 'Required',
  }),
});

type FormData = z.infer<typeof formSchema>;

export function QualifiedLeadForm({ leadId, onClose }: QualifiedLeadProps) {
  const [loading, setLoading] = useState(false);
  const OrgId = localStorage.getItem('OrganizationId');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leadStatus: 'QUALIFIED',
    },
  });

  async function changeStatus(values: FormData) {
    setLoading(true);
    try {
      const response = await fetch(ChangeStatus(leadId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'organization-id': `${OrgId}`,
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
    changeStatus(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <Button type="submit" className="w-full mb-2 mt-4" disabled={loading}>
          {loading ? 'Changing status...' : 'Change status'}
        </Button>
      </form>
    </Form>
  );
}

export default QualifiedLeadForm;
