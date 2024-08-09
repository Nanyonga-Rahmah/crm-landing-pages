'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import DepartmentForm from './DepartmentForm';

export function DialogDemo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-4 py-2 md:px-6 md:py-3">
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className="grid gap-4 p-6 lg:p-8 w-[90%] max-w-lg sm:max-w-xl lg:max-w-md mx-auto rounded-md">
        <DialogHeader className="items-center">
          <DialogTitle className="text-xl md:text-2xl font-semibold mb-4">
            Create New Department
          </DialogTitle>
        </DialogHeader>
        <DepartmentForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
