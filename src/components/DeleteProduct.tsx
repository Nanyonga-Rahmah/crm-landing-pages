import React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import DeleteActionForm from './form/DeleteProductForm';
import { IProduct } from './Tables/ProductsTable';

interface DeleteProductDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  product: IProduct;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  open,
  onClose,
  title,
  product,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-3/4 py-8">
        <DeleteActionForm title={title} product={product} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
