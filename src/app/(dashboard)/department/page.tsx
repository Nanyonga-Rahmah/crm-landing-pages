'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { GetDepartmentsByOrganization } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import DepartmentTable, {
  Department,
} from '@/components/Tables/DepartmentTable';

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [OrgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    setOrgId(localStorage.getItem('OrganizationId'));
  }, []);

  useEffect(() => {
    if (!OrgId) return;

    const fetchDepartments = async () => {
      try {
        const response = await fetch(GetDepartmentsByOrganization, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': OrgId,
          },
        });

        const data = await response.json();

        const departmentsWithMemberCount = data.data.departments.map(
          (department: any) => {
            const filteredUserDepartments = department.userDepartments.filter(
              (userDepartment: any) => userDepartment.roleType !== 'OWNER'
            );

            return {
              ...department,
              userDepartments: filteredUserDepartments,
              numberOfMembers: filteredUserDepartments.length,
            };
          }
        );

        setDepartments(departmentsWithMemberCount);
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

    fetchDepartments();
  }, [OrgId, departments]);

  const breadcrumbItems = [{ href: '/department', label: 'Departments' }];

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
      <div className="pt-6 pl-10 text-xl">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="m-8 shadow-md bg-white rounded-lg overflow-hidden">
        <DepartmentTable departments={departments} />
      </div>
    </>
  );
};

export default DepartmentPage;
