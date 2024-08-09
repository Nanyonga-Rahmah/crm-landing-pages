'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, signOut, useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { CreateCompany } from '@/lib/api_routes';

import Progress from '@/components/progress';
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
  name: z.string().min(2).max(50),
  address: z.object({
    addressLine1: z.string().min(5),
    addressLine2: z.string().optional(),
    city: z.string().min(2),
    region: z.string().min(2),
    postalCode: z.string().min(4),
    country: z.string().min(2),
  }),
  phoneNumber: z.string().min(10).max(15),
  organizationEmail: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddCompany() {
  const { data: session, status, update } = useSession();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        region: '',
        postalCode: '',
        country: '',
      },
      phoneNumber: '',
      organizationEmail: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const AccessToken = session?.user.token?.token;

    try {
      const response = await fetch(CreateCompany, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AccessToken}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      const organizationId = data.data.newOrganization.id;
      const userType = 'OWNER';

      if (!response.ok) {
        toast.error('Session expired, login to create organization');
      } else {
        setSuccessMessage('Organization created successfully!');
        localStorage.setItem('UserType', userType);
        localStorage.setItem('OrganizationId', organizationId);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col  h-11/12 w-auto p-4 rounded-r-xl justify-center px-8 py-4 mt-1  mb-1 overflow-y-hidden">
        <h3 className="text-2xl ">Enter your Company/Organization details</h3>
        <p className="text-gray-400 pb-6">
          Your Company/Organization is where you can find your team and manage
          their activities
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-500">
                    Company/Organization Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row md:space-x-2 ">
              <FormField
                control={form.control}
                name="address.addressLine1"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-500">
                      Address Line 1
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.addressLine2"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-500">
                      Address Line 2
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-500">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.region"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-500">
                      Region
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2">
              <FormField
                control={form.control}
                name="address.postalCode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-500">
                      Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-500">
                      Country
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-500 ">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organizationEmail"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm text-gray-500">
                      Organization Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-10 py-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto space-y-4 "
              >
                {form.formState.isSubmitting ? 'Creating...' : 'Continue'}
              </Button>
            </div>
            {errorMessage && (
              <div className="text-red-500 mt-2">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-green-500 mt-2">{successMessage}</div>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
