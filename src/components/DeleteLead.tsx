import React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import DeleteLeadForm from './form/DeleteLeadForm';

interface DeleteLeadDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  leadId: string;
}

const DeleteLeadDialog: React.FC<DeleteLeadDialogProps> = ({
  open,
  onClose,
  title,
  leadId,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-3/4 py-8">
        <DeleteLeadForm title={title} onClose={onClose} leadId={leadId} />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLeadDialog;
