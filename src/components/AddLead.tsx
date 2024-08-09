import React, { useState } from 'react';

import AddLeadsForm from '@/components/form/AddLeadsForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type AddLeadProps = {
  type: 'Client' | 'Prospect';
  bType: 'HOME' | 'ENTERPRISE';
};

function AddLead({ type, bType }: AddLeadProps) {
  const title = type === 'Client' ? 'Add new Client' : 'Add new Prospect';
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-full p-4 ">
          {type === 'Client' ? 'Add Client' : 'Add Prospect'}
        </Button>
      </DialogTrigger>
      <DialogContent className="grid gap-4 p-6 lg:p-8 w-[90%] max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto rounded-md ">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl md:text-3xl font-normal">
            {title}
          </DialogTitle>
        </DialogHeader>
        <AddLeadsForm type={type} onClose={handleClose} bType={bType} />
      </DialogContent>
    </Dialog>
  );
}

export default AddLead;
