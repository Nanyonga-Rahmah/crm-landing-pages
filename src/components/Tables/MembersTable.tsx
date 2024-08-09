'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Member } from '@/app/(dashboard)/department/[departmentId]/page';
import { FiFilter, FiSearch } from 'react-icons/fi';

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

import { Delete } from '../DeleteMember';

interface MemberTableProps {
  members: Member[];
}

export const MembersTable: React.FC<MemberTableProps> = ({ members }) => {
  const searchParams = useSearchParams();
  const departmentName = searchParams.get('name');
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
      <div className="flex justify-between items-center px-4 py-6 bg-white border-t border-x border-gray-300 rounded-t-lg shadow-sm overflow-hidden">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-normal px-6">
            {departmentName || 'Department'}
          </h1>
          <Badge className="rounded-full bg-red-200 flex justify-center items-center p-2 w-8 h-8 mt-2">
            {members.length || 0}
          </Badge>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative w-48">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <Input placeholder="Search" className="pl-10" />
          </div>
        </div>
      </div>
      <div className="border-b border-x border-gray-300 rounded-b-lg shadow-sm overflow-hidden bg-white px-6">
        {members.length > 0 ? (
          <Table className="w-full bg-white">
            <TableHeader>
              <TableRow className="gap-x-2">
                <TableHead>#</TableHead>
                <TableHead>Member</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                {isOwner && (
                  <TableHead className="text-center">Assigned tasks</TableHead>
                )}
                {isOwner && (
                  <TableHead className="text-center">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member, index) => (
                <TableRow key={member.id} className="gap-2 px-2">
                  <TableCell className="text-sm font-semibold">
                    {index + 1}
                  </TableCell>
                  <TableCell className=" flex items-center gap-2">
                    <Image
                      src="/user.png"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <p className="text-sm font-medium">
                      {`${member.user.firstName} ${member.user.lastName}`}
                    </p>
                  </TableCell>
                  <TableCell className="text-center p-2">
                    {member.user.email}
                  </TableCell>
                  <TableCell className="text-center p-2">
                    <Badge variant="default" className="text-xs font-light">
                      None
                    </Badge>
                  </TableCell>
                  {isOwner && (
                    <TableCell className="text-center p-2">
                      {member.user.tasks || 'None'}
                    </TableCell>
                  )}
                  {isOwner && (
                    <TableCell className="text-center p-2">
                      <div className="flex justify-center space-x-2">
                        <button className="pr-2">
                          <Image
                            src="/edit1.svg"
                            alt="edit"
                            width={20}
                            height={20}
                          />
                        </button>
                        <div className="flex justify-center space-x-2">
                          <button>
                            <Delete member={member} />
                          </button>
                        </div>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-white rounded-b-lg">
              <TableRow>
                <TableCell
                  colSpan={isOwner ? 6 : 4}
                  className="text-start text-xs text-gray-400"
                >
                  Shows {members.length}{' '}
                  {members.length === 1 ? 'result' : 'results'}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="flex justify-center items-center h-full p-6 ">
            <p className="text-center text-sm font-medium mt-4 text-gray-500">
              No members found
            </p>
          </div>
        )}
      </div>
    </>
  );
};
