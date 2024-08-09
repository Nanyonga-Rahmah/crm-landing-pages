'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { InviteUser } from '@/lib/api_routes';

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

import { IEmployee } from '../Tables/EmployeesTable';

interface InvitationFormProps {
  onClose: () => void;
}

const FormSchema = z.object({
  email: z.string().min(2, { message: 'Field is required' }).email(),

  firstName: z.string().min(2, { message: 'Field is required' }),
  lastName: z.string().min(2, { message: 'Field is required' }),
});

type FormData = z.infer<typeof FormSchema>;

export function InvitationForm({ onClose }: InvitationFormProps) {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('AccessToken');
  const OrgId = localStorage.getItem('OrganizationId');

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);

    try {
      const response = await fetch(InviteUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'organization-id': `${OrgId}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error, {
          style: {
            backgroundColor: '#FFE6E6',
            color: 'red',
            border: '1px solid red',
          },
        });
        setTimeout(() => {
          form.reset();
          onClose();
        }, 2000);
      } else {
        toast.success(data.message, {
          style: {
            backgroundColor: '#E6FFED',
            color: 'green',
            border: '1px solid green',
          },
        });
        window.location.reload();

        setTimeout(() => {
          form.reset();
          onClose();
        }, 1000);
      }
    } catch (error) {
      toast.error('An error occurred during the invitation process.', {
        style: {
          backgroundColor: '#FFE6E6',
          color: 'red',
          border: '1px solid red',
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid gap-4 items-center"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-l font-semibold">First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="First Name"
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
          name="lastName"
          render={({ field }) => (
            <FormItem className="grid">
              <FormLabel className="text-l font-semibold">Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Last Name"
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
          name="email"
          render={({ field }) => (
            <FormItem className="grid">
              <FormLabel className="text-l font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  {...field}
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-10" disabled={loading}>
          {loading ? 'Sending...' : 'Send Invite'}
        </Button>
      </form>
    </Form>
  );
}

export default InvitationForm;
function onInviteSuccess(arg0: {
  id: any; // Assuming the API returns the new employee's ID
  firstName: string;
  lastName: string;
  email: string;
  userDepartments: never[];
}) {
  throw new Error('Function not implemented.');
}
