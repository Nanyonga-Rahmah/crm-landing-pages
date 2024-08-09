import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { ChangeStatusDialog } from '@/components/ChangeStatusDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import DeleteLeadDialog from './DeleteLead';
import DeleteProductDialog from './DeleteProduct';
import { AssignDemo } from './form/AssignDepartmentForm';
import { IEmployee } from './Tables/EmployeesTable';
import { IProduct } from './Tables/ProductsTable';

export type ActionProps = {
  leadId?: string;
  businessType?: string;
  product?: IProduct;
  employeeId?: IEmployee;
  proposalId?: string;
  visitId?: string | string[];
  productId?: string;
  leadStatus?: string;
};

export function Actions({
  leadId,
  businessType,
  product,
  employeeId,
  proposalId,
  visitId,
  productId,
  leadStatus,
}: ActionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [showAssignDemo, setShowAssignDemo] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const handleDeleteClick = () => {
    if (
      ['/products', '/prospects', '/leads', '/clients', '/employees'].includes(
        pathname
      )
    ) {
      setDeleteDialogOpen(true);
    }
  };
  const handleAssignDemoClick = () => {
    setShowAssignDemo(true);
  };

  const handleClose = () => {
    setShowAssignDemo(false);
  };

  const handleView = () => {
    if (proposalId) {
      router.push(`/proposals/${proposalId}`);
    } else if (visitId) {
      router.push(`/visits/${visitId}`);
    } else if (productId) {
      router.push(`/products/${productId}`);
    } else if (leadId) {
      // Route based on lead status
      switch (leadStatus) {
        case 'PROSPECT':
          router.push(`/prospects/${leadId}`);
          console.log(`/prospects/${leadId}`);
          break;
        case 'LEAD':
        case 'QUALIFIED':
          router.push(`/leads/${leadId}`);
          break;
        case 'CLOSED':
          router.push(`/clients/${leadId}`);
          break;
        default:
          console.error('Unknown lead status:', leadStatus);
        // Optionally, you could route to a default page or show an error message
      }
    }
  };
  const handleViewReport = () => {
    router.push(`/report?userId=${employeeId?.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image src="/actions.svg" alt="view" width={40} height={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
          {[
            '/products',
            '/prospects',
            '/leads',
            '/clients',
            '/employees',
            '/visits',
          ].includes(pathname) && (
            <DropdownMenuItem onClick={handleDeleteClick}>
              Delete
            </DropdownMenuItem>
          )}
          {![
            '/products',
            '/clients',
            '/proposals',
            '/employees',
            '/visits',
          ].includes(pathname) && (
            <DropdownMenuItem onClick={handleDialogOpen}>
              Change Status
            </DropdownMenuItem>
          )}
          {pathname === '/employees' && (
            <>
              <DropdownMenuItem onClick={handleAssignDemoClick}>
                Assign Department
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewReport}>
                View Report
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AssignDemo
        isOpen={showAssignDemo}
        onClose={handleClose}
        employee={employeeId}
      />

      <ChangeStatusDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        leadId={leadId}
        businessType={businessType}
      />

      {isDeleteDialogOpen && pathname === '/products' && product && (
        <DeleteProductDialog
          open={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          title="Product"
          product={product}
        />
      )}

      {isDeleteDialogOpen &&
        ['/prospects', '/leads', '/clients', '/employees'].includes(pathname) &&
        leadId && (
          <DeleteLeadDialog
            open={isDeleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            title={
              pathname === '/prospects'
                ? 'Prospect'
                : pathname === '/leads'
                  ? 'Lead'
                  : pathname === '/clients'
                    ? 'Client'
                    : 'Employee'
            }
            leadId={leadId}
          />
        )}
    </>
  );
}
