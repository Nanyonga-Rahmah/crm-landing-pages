'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { GetDepartmentById } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MembersTable } from '@/components/Tables/MembersTable';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  roleType: string;
  user: any;
  tasks: string;
  userId: string;
}

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const departmentName = searchParams.get('name');
  const departmentId = searchParams.get('id');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(GetDepartmentById(departmentId));
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        const filterMembers = data.data.users.filter(
          (user: Member) => user.roleType !== 'OWNER'
        );

        setMembers(filterMembers);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (departmentId) {
      fetchMembers();
    }
  }, [departmentId, members]);

  const breadcrumbItems = [
    { href: '/department', label: 'Departments' },
    { label: departmentName || '' },
  ];

  if (loading) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="sticky top-0 pt-6 pl-8 text-xl w-full bg-white z-10">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <LoadingSpinner size="large" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <ErrorDisplay error={error} />
      </>
    );
  }
  return (
    <>
      <DashboardPageHeader pageTitle="Dashboard" />
      <div className="pt-6 pl-8 text-xl">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="px-8 py-6 bg-white">
        <MembersTable members={members} />
      </div>
    </>
  );
};

export default MembersPage;
