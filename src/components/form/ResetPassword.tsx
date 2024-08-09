'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode } from 'jwt-decode';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { toast } from 'sonner';
import { z } from 'zod';

import { ResetPassword } from '@/lib/api_routes';

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

const formSchema = z
  .object({
    newpassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newpassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get('id');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [submitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newpassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!id) {
      setErrorMessage('Invalid request. ID is missing.');
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(ResetPassword(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: values.newpassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setSuccessMessage('Password updated successfully,Login to comtinue');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(`${error}`);
    }

    form.reset();
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg py-12  px-10 sm:w-[90%] md:w-full">
      <h3 className="text-4xl font-md mb-4">Reset Your Password</h3>
      <p className="text-center py-4 text-sm">Enter your new password below</p>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && (
        <div className="text-green-500 ">{successMessage}</div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      {...field}
                      className="rounded-xl pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-3 text-sm"
                    >
                      {showPassword ? <TbEye /> : <TbEyeOff />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      {...field}
                      className="rounded-xl pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-3 text-sm"
                    >
                      {showPassword ? <TbEye /> : <TbEyeOff />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full text-white text-sm mb-2 mt-4">
            {form.formState.isSubmitting ? 'Submitting...' : 'Reset Password'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
