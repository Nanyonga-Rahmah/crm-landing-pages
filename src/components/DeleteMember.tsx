'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Member } from '@/app/(dashboard)/department/[departmentId]/page';
import { toast } from 'sonner';

import { DeleteMember } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

interface IDeleteProps {
  member: Member;
}

export const Delete: React.FC<IDeleteProps> = ({ member }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (member: Member) => {
    setIsDeleting(true);

    try {
      const response = await fetch(DeleteMember(member.userId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast('Member deleted Successfully.');
      } else {
        toast('Failed to delete the member. Please try again.');
      }
    } catch (error) {
      toast('Failed to delete the member. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Image src="/delete1.svg" alt="delete" width={20} height={20} />
      </DialogTrigger>
      <DialogContent className="w-3/4 py-8">
        <h3>Are you sure you want to delete this member?</h3>
        <p className="text-red-600 flex">
          <Image src="/warning.svg" width={24} height={24} alt="warning" />
          This action cannot be undone
        </p>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => handleDelete(member)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
