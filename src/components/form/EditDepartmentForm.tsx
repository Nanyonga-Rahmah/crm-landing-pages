'use client';

import { useEffect, useState } from 'react';
import { Member } from '@/app/(dashboard)/department/[departmentId]/page';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { EditDepartment, GetDepartmentById } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Department } from '../Tables/DepartmentTable';

interface EditFormProps {
  department: Department;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string(),
  departmentHeadId: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditForm({ department, onClose }: EditFormProps) {
  const id = department.id;

  const [members, setMembers] = useState<Member[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: department.name,
      departmentHeadId: '',
    },
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(GetDepartmentById(id), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        const members = data.data.users.filter(
          (user: Member) => user.roleType !== 'OWNER'
        );

        setMembers(members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [id]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(EditDepartment(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage(result.message);
        setTimeout(() => {
          setSuccessMessage(null);
          form.reset();
          onClose();
        }, 1000);
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error('Error updating department:', error);
      setErrorMessage('An error occurred while updating the department.');
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Department Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="rounded-xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departmentHeadId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Department Head</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) =>
                      form.setValue('departmentHeadId', value)
                    }
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select a department head" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.userId}>
                          {`${member.user.firstName} ${member.user.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}

          <Button
            type="submit"
            className="w-full text-white text-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Form>
    </>
  );
}
