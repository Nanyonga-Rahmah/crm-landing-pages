import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { DeleteProduct } from '@/lib/api_routes';

import { Button } from '@/components/ui/button';

import { IProduct } from '../Tables/ProductsTable';

interface DeleteFormProps {
  title: string;
  product: IProduct;
  onClose: () => void;
}

const DeleteActionForm: React.FC<DeleteFormProps> = ({
  title,
  onClose,
  product,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(DeleteProduct(product.id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Product deleted successfully.');
      } else {
        toast.error('Failed to delete Product .Please try again later.');
      }
    } catch (error) {
      toast.error('Failed to delete Product .Please try again later');
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
          This action cannot be undone. This will also cause any sales related
          to this product to be deleted!
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

export default DeleteActionForm;
