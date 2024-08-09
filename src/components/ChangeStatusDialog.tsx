import { useState } from 'react';

import { ChangeStatusForm } from '@/components/form/ChangeStatusForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ChangeStatusDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  leadId?: string;
  businessType?: string;
};

export function ChangeStatusDialog({
  isOpen,
  onClose,
  leadId,
  businessType,
}: ChangeStatusDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] lg:max-w-[450px] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-center py-2 text-xl font-semibold">
            Change Status
          </DialogTitle>
        </DialogHeader>
        <ChangeStatusForm
          leadId={leadId}
          onClose={onClose}
          businessType={businessType}
        />
      </DialogContent>
    </Dialog>
  );
}
