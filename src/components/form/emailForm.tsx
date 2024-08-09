'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ForgotPassword } from '@/lib/api_routes';

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
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

export default function EmailForm() {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(ForgotPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSuccessMessage(
          `A link has been sent to ${values.email}. Please check your inbox.`
        );
      } else {
        const data = await response.json();

        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Internal server error occured,please try again later');
    }
    setTimeout(() => {
      form.reset();
      setSuccessMessage(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-center p-10 max-w-lg   bg-white rounded-xl  sm:w-max md:w-full">
      <h3 className=" text-3xl font-semibold">Find Your Account</h3>
      <p className=" py-4 text-xl">
        Enter the email associated with your account
      </p>
      {errorMessage && (
        <div className="text-red-500 text-center">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-500 ">{successMessage}</div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Email:</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder=""
                    {...field}
                    className="rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full text-white mb-4 mt-8">
            {form.formState.isSubmitting ? 'Submiting...' : 'Next'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
