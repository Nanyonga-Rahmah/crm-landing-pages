import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { toast } from 'sonner';
import { z } from 'zod';

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
  email: z.string().min(2, { message: ' Field is Required ' }).email(),
  password: z
    .string()
    .min(2, { message: ' Field is Required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
});
type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (session) {
      console.log('session', session);
      const AccessToken = session?.user?.token?.token;
      const id = session?.user?.token?.user.id;

      localStorage.setItem('AccessToken', AccessToken);
      localStorage.setItem('UserId', id);

      const organizations = session?.user?.token?.user.userOrganizations || [];

      if (organizations.length > 1) {
        return router.push('/organizations');
      } else if (organizations.length === 1) {
        const OrganizationId = session?.user?.token?.user.organizationId;
        const userType =
          session?.user?.token?.user.userOrganizations[0].userType;
        localStorage.setItem('UserType', userType);
        localStorage.setItem('OrganizationId', OrganizationId);
        router.push('/organizations');
      } else {
        return router.push('/addCompany');
      }
    }
  }, [session]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    try {
      const result: any = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result.status === 200) {
        setTimeout(() => {
          toast.success('Login successful! Redirecting...', {
            style: {
              backgroundColor: '#E6FFED',
              color: 'green',
              border: '1px solid green',
            },
          });
          form.reset();
        }, 1000);
      } else {
        toast.error(result.error, {
          style: {
            backgroundColor: '#FFE6E6',
            color: 'red',
            border: '1px solid red',
          },
        });
        form.reset();
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error('Invalid credentials', {
        style: {
          backgroundColor: '#FFE6E6',
          color: 'red',
          border: '1px solid red',
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white rounded-xl shadow-lg py-5 px-8">
        <p className="font-bold pb-4">
          <span className="text-teal-600">Nova</span>
          <span>CRM</span>
        </p>
        <h3 className="text-center text-xl pb-5 md:text-2xl">
          Login to your account
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pb-10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-l font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-l font-semibold">
                    Password
                  </FormLabel>
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
            <div className="flex text-sm lg:ml-40 sm:ml-10 justify-end pt-4">
              <Link href="/forgotPassword">
                <p className="text-teal-600 hover:underline">
                  Forgot Password?
                </p>
              </Link>
            </div>

            <Button type="submit" className="w-full mb-2 mt-4">
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>

            <span className="flex pt-2">
              <p className="text-gray-400 pr-2">Don't have an account?</p>
              <p className="text-teal-600 hover:underline">
                <a href="/signup">Register</a>
              </p>
            </span>
          </form>
        </Form>
      </div>
    </>
  );
}
