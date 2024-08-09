import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { DeleteLead } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';

interface DeleteFormProps {
  title: string;
  leadId: string;
  onClose: () => void;
}

const DeleteLeadForm: React.FC<DeleteFormProps> = ({
  title,
  leadId,
  onClose,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(DeleteLead(leadId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success(`${title} deleted successfully.`);
        onClose(); // Close the dialog or handle closure
      } else {
        toast.error(`Failed to delete ${title}. Please try again later.`);
      }
    } catch (error) {
      toast.error(`Failed to delete ${title}. Please try again later.`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full ">
      <div className="space-y-2">
        <h3>Are you sure you want to delete this {title}?</h3>
        <p className="text-red-600 flex items-center text-sm">
          <Image
            src="/warning.svg"
            width={24}
            height={24}
            alt="warning"
            className="mr-2 mb-2"
          />
          This action cannot be undone. This will also cause any related data to
          be deleted!
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
};

export default DeleteLeadForm;
