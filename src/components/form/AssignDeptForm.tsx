'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  AssignDepartment,
  GetDepartmentsByOrganization,
} from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Department } from '../Tables/DepartmentTable';
import { IEmployee } from '../Tables/EmployeesTable';

const formSchema = z.object({
  departmentIds: z.array(z.string()),
});

interface DeptFormProps {
  employee?: IEmployee;
  onClose: () => void;
}

export function DeptForm({ employee, onClose }: DeptFormProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const OrgId = localStorage.getItem('OrganizationId');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(GetDepartmentsByOrganization, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'organization-id': `${OrgId}`,
          },
        });
        const data = await response.json();
        setDepartments(data.data.departments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    if (OrgId) {
      fetchDepartments();
    }
  }, [OrgId, departments]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentIds: [],
    },
  });

  const handleSelectedChange = (id: string) => {
    const updatedSelectedValues = selectedValues.includes(id)
      ? selectedValues.filter((v) => v !== id)
      : [...selectedValues, id];

    setSelectedValues(updatedSelectedValues);
    form.setValue('departmentIds', updatedSelectedValues);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!employee) {
        throw new Error('Employee is undefined');
      }

      const response = await fetch(AssignDepartment(employee.id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'User already exists in the department'
        );
      }

      toast.success('Department(s) assigned successfully', {
        style: {
          backgroundColor: '#E6FFED',
          color: 'green',
          border: '1px solid green',
        },
      });

      form.reset();
      onClose();
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message || 'User already assigned to that department',
          {
            style: {
              backgroundColor: '#FFE6E6',
              color: 'red',
              border: '1px solid red',
            },
          }
        );
        form.reset();
        onClose();
      } else {
        toast.error('An unknown error occurred', {
          style: {
            backgroundColor: '#FFE6E6',
            color: 'red',
            border: '1px solid red',
          },
        });
        form.reset();
        onClose();
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="departmentIds"
          render={() => (
            <FormItem className="grid lg:col-span-2">
              <FormLabel className="text-l font-semibold">
                Department(s)
              </FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between p-2 border rounded-xl cursor-pointer">
                      <div className="flex flex-wrap gap-2 overflow-x-hidden">
                        {selectedValues.length > 0 ? (
                          selectedValues.map((id) => {
                            const dept = departments.find((p) => p.id === id);
                            return (
                              <div
                                key={id}
                                className="flex bg-slate-200 text-xs flex-row text-black rounded-sm items-center p-1"
                              >
                                {dept?.name}
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-gray-500 text-xs">
                            Select department(s)
                          </span>
                        )}
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {departments.map((department) => (
                      <DropdownMenuCheckboxItem
                        key={department.id}
                        checked={selectedValues.includes(department.id)}
                        onCheckedChange={() =>
                          handleSelectedChange(department.id)
                        }
                      >
                        {department.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mb-2 mt-4">
          {form.formState.isSubmitting ? 'Submitting...' : 'Assign'}
        </Button>
      </form>
    </Form>
  );
}
