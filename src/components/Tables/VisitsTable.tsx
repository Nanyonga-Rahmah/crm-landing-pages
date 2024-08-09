import React from 'react';
import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Actions } from '../Actions';

export interface IVisits {
  id: string;
  firstName?: string;
  businessName?: string;
  location: string;
  visitType: string;
  visitDate: string;
}
interface IVisitsTable {
  visits: IVisits[];
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const CheckVisit = (visit: string) => {
  if (visit === 'NEW') return 'NEW VISIT';
  if (visit === 'FOLLOW_UP') return 'FOLLOW-UP';

  return 'N/A';
};

const VisitsTable = ({ visits }: IVisitsTable) => {
  return (
    <>
      {visits.length > 0 ? (
        <Table className="my-5">
          <TableHeader>
            <TableRow className="border-collapse border-gray-100">
              <TableHead className="text-black text-xl font-normal">
                #
              </TableHead>
              <TableHead className="text-black text-xl font-normal">
                Name
              </TableHead>
              <TableHead className="text-black text-xl font-normal">
                Location
              </TableHead>
              <TableHead className="text-black text-xl font-normal">
                Visit Type
              </TableHead>
              <TableHead className="text-black text-xl font-normal">
                Visit Date
              </TableHead>
              <TableHead className="text-right text-xl font-normal text-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visits.map((visit, index) => (
              <TableRow key={index} className="border-collapse border-gray-100">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="hover:text-primary">
                  {visit.firstName || visit.businessName}
                </TableCell>
                <TableCell>{visit.location}</TableCell>
                <TableCell>{CheckVisit(visit.visitType)}</TableCell>
                <TableCell>{formatDate(visit.visitDate)}</TableCell>
                <TableCell className="text-right">
                  <div className="actions flex justify-end gap-4">
                    <Actions visitId={visit.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center text-xl font-semibold">
          No visits , Add one
        </div>
      )}
    </>
  );
};

export default VisitsTable;
