'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { toast } from 'sonner';
import { z } from 'zod';

import { Register } from '@/lib/api_routes';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
    firstName: z.string().min(2, { message: ' Field is Required ' }).max(50),
    lastName: z.string().min(2, { message: ' Field is Required ' }).max(50),
    email: z.string().min(2, { message: ' Field is Required ' }).email(),
    password: z
      .string()
      .min(2, { message: ' Field is Required' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(2, { message: ' Field is Required' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUp: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [storedEmail, setEmail] = useLocalStorage('userEmail', '');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(Register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data.error) {
        setTimeout(() => {
          toast.error(data.error, {
            style: {
              backgroundColor: '#FFE6E6',
              color: 'red',
              border: '1px solid red',
            },
          });
          form.reset();
        }, 1000);
        return;
      }

      setEmail(values.email);

      setTimeout(() => {
        toast.success(
          'Signup successful! Please verify your email to continue',
          {
            style: {
              backgroundColor: '#E6FFED',
              color: 'green',
              border: '1px solid green',
            },
          }
        );
        form.reset();
        router.push('/verifyEmail');
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setTimeout(() => {
          toast.error('Disconnected, Connect to the Internet to Signup', {
            style: {
              backgroundColor: '#FFE6E6',
              color: 'red',
              border: '1px solid red',
            },
          });
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center bg-white rounded-xl shadow-lg w-full max-w-xl sm:w-full py-2 px-2 overflow-hidden">
      <p className="font-bold py-2 text-center">
        <span className="text-teal-600">Nova</span>
        <span>CRM</span>
      </p>
      <h3 className="text-center text-2xl font-normal  px-2">
        Welcome to NovaCRM!
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          <div className="flex space-x-4 my-2 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-l font-semibold">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="rounded-[12px]"
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-l font-semibold">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="rounded-[12px]"
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-l font-semibold my-2">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    {...field}
                    className="rounded-[12px]"
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-l font-semibold my-2">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      {...field}
                      className="rounded-[12px] pr-10"
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
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-l font-semibold my-2">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative my-2">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="********"
                      {...field}
                      className="rounded-[12px] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-3 text-sm"
                    >
                      {showConfirmPassword ? <TbEye /> : <TbEyeOff />}
                    </button>
                  </div>
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center my-4">
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mr-2 rounded-none"
                    />
                    <label htmlFor="terms" className="text-sm hover:underline ">
                      <a className="text-primary" href="/termsAndConditions">
                        I agree to the terms and conditions
                      </a>
                    </label>
                  </div>
                </FormControl>
                {fieldState.error && (
                  <FormMessage>{fieldState.error.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mb-2 mt-4">
            {form.formState.isSubmitting ? 'Submitting...' : 'Sign Up'}
          </Button>
        </form>
      </Form>

      <div className="flex p-4 justify-center space-x-2">
        <span className="text-gray-500 font-weight-400 text-center text-sm">
          Already have an account?
        </span>
        <span className="text-primary font-weight-400 text-sm hover:underline">
          <a href="/login">Login</a>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
