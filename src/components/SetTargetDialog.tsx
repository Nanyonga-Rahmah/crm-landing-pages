import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { SetTargetForm } from './form/SetTargetForm';

export function SetTargetDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen}>Set Target</Button>
      </DialogTrigger>
      <DialogContent className="grid gap-4 p-6 lg:p-8 w-[90%] max-w-lg sm:max-w-xl lg:max-w-md mx-auto rounded-md">
        <DialogHeader className="items-center">
          <DialogTitle>Set a new Target</DialogTitle>
        </DialogHeader>
        <SetTargetForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
