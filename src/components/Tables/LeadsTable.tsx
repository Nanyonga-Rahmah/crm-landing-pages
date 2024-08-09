import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Actions } from '../Actions';
import { Badge } from '../ui/badge';

export interface ILeads {
  id: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  phoneNumber: string;
  leadStatus?: string;
  businessType: string;
}

interface ILeadsProps {
  leads: ILeads[];
  defaultStatus: string;
  currentPage: number;
  itemsPerPage: number;
  updateLeadStatus?: (leadId: string, newStatus: string) => void;
}

const LeadsTable: React.FC<ILeadsProps> = ({
  leads,
  defaultStatus,
  currentPage,
  itemsPerPage,
}) => {
  const pathname = usePathname();

  const checkStatus = (leadStatus: string | undefined) => {
    if (leadStatus === 'LEAD') return 'bg-blue-400';
    if (leadStatus === 'PROSPECT') return 'bg-orange-500';
    if (leadStatus === 'QUALIFIED') return 'bg-yellow-500';
    if (leadStatus === 'CLOSED') return 'bg-green-500';
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLeads = leads.slice(startIndex, endIndex);

  return (
    <>
      {leads.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="border-collapse border-gray-100">
              <TableHead className="text-black text-xl text-center font-normal">
                #
              </TableHead>
              <TableHead className="text-black text-xl text-center font-normal">
                Name
              </TableHead>
              <TableHead className="text-black text-xl text-center font-normal">
                Phone
              </TableHead>
              {pathname === '/leads' && (
                <TableHead className="text-black text-xl text-center font-normal">
                  Status
                </TableHead>
              )}
              <TableHead className="text-black text-xl text-center font-normal">
                Sale Type
              </TableHead>
              <TableHead className="text-center text-xl font-normal text-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.map((lead, index) => (
              <TableRow
                key={lead.id}
                className="border-collapse border-gray-100"
              >
                <TableCell className="font-medium text-center">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell className="text-[1rem] text-center">
                  {lead.firstName || lead.businessName}
                </TableCell>
                <TableCell className="text-[1rem] text-center">
                  {lead.phoneNumber}
                </TableCell>
                {pathname === '/leads' && (
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={`border-none text-[.7rem] text-center text-white ${checkStatus(
                        lead.leadStatus
                      )}`}
                    >
                      {lead.leadStatus === 'QUALIFIED'
                        ? `${lead.leadStatus} LEAD`
                        : lead.leadStatus}
                    </Badge>
                  </TableCell>
                )}
                <TableCell className="text-[1rem] text-center">
                  {lead.businessType}
                </TableCell>
                <TableCell className="flex justify-center">
                  <Actions
                    leadId={lead.id}
                    businessType={lead.businessType}
                    leadStatus={lead.leadStatus}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center h-full p-6">
          <p className="mt-4 font-medium text-center text-gray-500">
            {pathname === '/leads' && 'No leads found'}
            {pathname === '/clients' && 'No clients found'}
            {pathname === '/prospects' && 'No prospects found'}
          </p>
        </div>
      )}
    </>
  );
};

export default LeadsTable;
