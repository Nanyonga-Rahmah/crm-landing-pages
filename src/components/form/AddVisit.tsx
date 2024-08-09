import { useState } from 'react';

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

import { VisitForm } from './VisitForm';

export function VisitDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="py-3">Add New Vist</Button>
      </DialogTrigger>
      <DialogContent className=" md:w-4/5 w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add Visit</DialogTitle>
        </DialogHeader>

        <VisitForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
