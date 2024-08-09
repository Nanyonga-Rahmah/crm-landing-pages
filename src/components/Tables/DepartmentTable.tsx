'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DeleteDialog } from '../DeleteDepartment';
import { DialogDemo as AddDepartment } from '../form/CreateDepartment';
import { EditDialog } from '../form/EditDepartment';
import Search from '../user-search';

export interface Department {
  id: string;
  name: string;
  numberOfMembers: number;

  departmentHead: string;
  description: string;
}

interface DepartmentTableProps {
  departments: Department[];
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ departments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('UserType');
      setUserType(userType);
    }
  }, []);

  const isOwner = userType === 'OWNER';

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 px-5 py-6 bg-white border-t border-x border-gray-300 rounded-t-lg shadow-sm overflow-hidden">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-normal">Departments</h1>
          <Badge className="rounded-full bg-red-200 flex justify-center items-center p-2 w-8 h-8 mt-2">
            {departments.length || 0}
          </Badge>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isOwner && <AddDepartment />}
        </div>
      </div>
      <div className="border-b border-x border-gray-300 rounded-b-lg shadow-sm overflow-hidden bg-white px-6">
        {filteredDepartments.length > 0 ? (
          <Table className="w-full bg-white">
            <TableHeader>
              <TableRow className="gap-x-2">
                <TableHead className="text-black text-xl font-normal text-center">
                  #
                </TableHead>
                <TableHead className="text-black text-xl font-normal text-center">
                  Department
                </TableHead>
                <TableHead className="text-center text-black text-xl font-normal">
                  Members
                </TableHead>
                <TableHead className="text-center text-black text-xl font-normal">
                  Head
                </TableHead>
                {isOwner && (
                  <TableHead className="text-center text-black text-xl font-normal">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((department, index) => (
                <TableRow key={department.id} className="gap-x-2">
                  <TableCell className="text-sm font-semibold text-center text-[1rem]">
                    {index + 1}
                  </TableCell>
                  <TableCell className="p-2 text-center text-[1rem]">
                    <Link
                      href={{
                        pathname: `/department/${department.name}`,
                        query: {
                          id: department.id,
                          name: department.name,
                        },
                      }}
                      className="hover:text-primary"
                    >
                      {department.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center p-2 text-[1rem]">
                    {department.numberOfMembers || 0}
                  </TableCell>
                  <TableCell className="text-center p-2 text-[1rem]">
                    {department.departmentHead || 'None'}
                  </TableCell>
                  {isOwner && (
                    <TableCell className="text-center p-2">
                      <div className="flex justify-center space-x-2">
                        <EditDialog department={department} />
                        <DeleteDialog
                          id={department.id}
                          name={department.name}
                          numberOfMembers={department.numberOfMembers}
                          departmentHead={department.departmentHead}
                          description={department.description}
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-white rounded-b-lg">
              <TableRow>
                <TableCell
                  colSpan={isOwner ? 5 : 4}
                  className="text-start text-xs text-gray-400"
                >
                  Shows {filteredDepartments.length} of {departments.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="flex justify-center items-center h-full p-6 ">
            <p className="text-center text-sm font-medium mt-4 text-gray-500">
              No departments found
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DepartmentTable;
