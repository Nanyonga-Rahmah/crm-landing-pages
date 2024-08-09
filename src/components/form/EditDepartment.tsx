'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Department } from '../Tables/DepartmentTable';
import EditForm from './EditDepartmentForm';

interface EditFormProps {
  department: Department;
}
export const EditDialog = ({ department }: EditFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Image src="/edit.svg" alt="edit" width={20} height={20} />
      </DialogTrigger>
      <DialogContent className="w-3/4 py-4 px-8">
        <DialogHeader>
          <DialogTitle className="pt-8">Edit Department</DialogTitle>
        </DialogHeader>

        <EditForm onClose={handleClose} department={department} />
      </DialogContent>
    </Dialog>
  );
};
