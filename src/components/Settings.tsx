import React, { useState } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IoIosContact } from 'react-icons/io';
import { toast } from 'sonner';
import { z } from 'zod';

import { UpdateUser } from '@/lib/api_routes';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { IUser } from './dashboard-page-header';
import { Button } from './ui/button';
import { getInitials } from './user-avatar';

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 1024 * 1024 * 5;

const Settings = (user: IUser) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [submit, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    firstName: z.string().min(2, { message: 'Field is required' }).max(50),
    middleName: z.string().max(50).optional(),
    lastName: z.string().min(2, { message: 'Field is required' }).max(50),
    email: z.string().min(2, { message: 'Field is required' }).email(),
    profileImage: z
      .any()
      .optional()
      .refine(
        (file) => {
          if (file && file instanceof File) {
            return file.size <= MAX_FILE_SIZE;
          }
          return true;
        },
        { message: 'Max image size is 5MB' }
      )
      .refine(
        (file) => {
          if (file && file instanceof File) {
            return ACCEPTED_IMAGE_MIME_TYPES.includes(file.type);
          }
          return true;
        },
        { message: 'Only .jpg, .jpeg, .png, and .webp formats are supported' }
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName || '',
      email: user.email,
      // profileImage: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(UpdateUser(user.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error, {
          style: {
            backgroundColor: '#FFE6E6',
            color: 'red',
            border: '1px solid red',
          },
        });
      } else {
        setTimeout(() => {
          toast.success(data.message, {
            style: {
              backgroundColor: '#E6FFED',
              color: 'green',
              border: '1px solid green',
            },
          });
          form.reset();
        }, 1000);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Disconnected, Connect to the Internet to Continue', {
          style: {
            backgroundColor: '#FFE6E6',
            color: 'red',
            border: '1px solid red',
          },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageURL(imageURL);
      form.setValue('profileImage', file);
    }
  };

  return (
    <div className="p-6 ">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center ">
        <div className="flex  gap-4">
          <div>
            <Image src="/person.svg" width={100} height={100} alt="person" />
          </div>
          <div className="details flex flex-col mt-6">
            <div> {`${user.firstName} ${user.lastName}`}</div>
            <div> {user.email}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl my-2">Update</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[400px]">
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
                name="middleName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-l font-semibold">
                      Middle Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Middle Name"
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
                name="profileImage"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-l font-semibold my-2">
                      Profile Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={handleImageChange}
                        className="rounded-[12px]"
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mb-2 mt-4">
                {form.formState.isSubmitting ? 'Submitting...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
