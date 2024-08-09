import React, { useState } from 'react';

import { InvitationForm } from '@/components/form/InvitationForm';
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

function InviteMembers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Invite Member</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-normal">
            Invite your team
          </DialogTitle>
          <DialogDescription className="text-center p-2">
            Add new members to your organization by entering their email
            addresses. They will receive an email invitation with a link to
            join.
          </DialogDescription>
        </DialogHeader>
        <InvitationForm onClose={handleClose} />
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}

export default InviteMembers;
