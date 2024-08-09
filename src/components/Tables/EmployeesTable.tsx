'use client';

import React, { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Actions } from '../Actions';
import InviteMembers from '../InviteMembers';

interface Department {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  departmentId: string;
  userId: string;
}
interface userOrganizations {
  id: string;
  userId: string;
  organizationId: string;

  userType: string;
}
interface userDepartments {
  id: string;
  userId: string;
  departmentId: string;
  department: Department;
  roleType: string;
}

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  userDepartments: userDepartments[] | null;
  userOrganizations: userOrganizations[] | null;
}
interface EmployeesTableProps {
  employees: IEmployee[];
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees }) => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('UserType');
      setUserType(userType);
    }
  }, []);

  const isOwner = userType === 'OWNER';

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 px-5 py-6 bg-white border-t border-x border-gray-300 rounded-t-lg shadow-sm overflow-hidden">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-normal">Employees</h1>
          <Badge className="rounded-full bg-red-200 flex justify-center items-center p-2 w-8 h-8 mt-2">
            {employees.length || 0}
          </Badge>
        </div>
        {isOwner && (
          <div className="flex gap-4 items-center">
            <InviteMembers />
          </div>
        )}
      </div>
      <div className="border-b border-x border-gray-300 rounded-b-lg shadow-sm overflow-hidden bg-white px-6">
        {employees.length > 0 ? (
          <Table className="w-full bg-white">
            <TableHeader>
              <TableRow className="gap-x-2">
                <TableHead className="text-black text-xl font-normal text-center">
                  #
                </TableHead>
                <TableHead className="text-black text-xl font-normal text-center">
                  Name
                </TableHead>
                <TableHead className="text-center text-black text-xl font-normal">
                  Email
                </TableHead>
                <TableHead className="text-center text-black text-xl font-normal">
                  Department(s)
                </TableHead>
                {isOwner && (
                  <TableHead className="text-center text-black text-xl font-normal">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index} className="gap-x-2">
                  <TableCell className="text-sm font-semibold text-center text-[1rem]">
                    {index + 1}
                  </TableCell>
                  <TableCell className="p-2  text-center text-[1rem]">{`${employee.firstName} ${employee.lastName}`}</TableCell>
                  <TableCell className="text-center p-2 text-[1rem]">
                    {employee.email}
                  </TableCell>
                  <TableCell className="text-center p-2 text-[1rem]">
                    {employee.userDepartments &&
                    employee.userDepartments.length > 0 ? (
                      employee.userDepartments.map((userDept, deptIndex) => (
                        <div key={deptIndex} className="flex justify-center">
                          <span>{userDept.department.name}</span>
                          {deptIndex !==
                            (employee.userDepartments?.length ?? 0) - 1 && (
                            <span className="ml-1"></span>
                          )}
                        </div>
                      ))
                    ) : (
                      <span>NONE</span>
                    )}
                  </TableCell>
                  {isOwner && (
                    <TableCell className="text-center p-2">
                      <div className="flex justify-center space-x-2">
                        <Actions employeeId={employee} />
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
                  Shows {employees.length} Employees
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="flex justify-center items-center h-full p-6 ">
            <p className="text-center text-sm font-medium mt-4 text-gray-500">
              No employees found
              {isOwner && ', Invite'}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeesTable;
