'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { DeleteDepartment } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Department } from './Tables/DepartmentTable';

export const DeleteDialog: React.FC<Department> = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteDepartment = async (id: string | null) => {
    setIsDeleting(true);

    try {
      const response = await fetch(DeleteDepartment(id), {
        method: 'DELETE',
        headers: {
          'content-Type': 'application/json',
        },
      });
      if (response.ok) {
        toast('department deleted Successfully.');
      } else {
        toast('Failed to delete the department. Please try again.');
      }
    } catch (error) {
      toast('Failed to delete the department. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image src="/delete.svg" alt="delete" width={20} height={20} />
      </DialogTrigger>
      <DialogContent className="w-3/4 py-8">
        <h3>Are you sure you want to delete this entry?</h3>
        <p className="text-red-600 flex">
          <Image src="/warning.svg" width={24} height={24} alt="warning" />
          This action can not be undone
        </p>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() => deleteDepartment(id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
