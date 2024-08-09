import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { AddProposalForm } from './form/AddProposalForm';

export function ProposalsDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen}>Add Proposal</Button>
      </DialogTrigger>
      <DialogContent className="grid gap-4 p-6 lg:p-8 w-[90%] max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto rounded-md">
        <DialogHeader className="items-center">
          <DialogTitle>Add New Proposal</DialogTitle>
        </DialogHeader>
        <AddProposalForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
