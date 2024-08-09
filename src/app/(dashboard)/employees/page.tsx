'use client';

import { error } from 'console';
import React, { useEffect, useState } from 'react';

import { GetUsers } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ErrorDisplay from '@/components/ErrorDisplay';
import InviteMembers from '@/components/InviteMembers';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmployeesTable, { IEmployee } from '@/components/Tables/EmployeesTable';
import { Badge } from '@/components/ui/badge';

function EmployeesPage() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [OrgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const organizationId = localStorage.getItem('OrganizationId');
      setOrgId(organizationId);
    }
  }, []);

  useEffect(() => {
    if (!OrgId) return;
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(GetUsers, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': `${OrgId}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }

        const data = await response.json();

        const filteredEmployees = data.data.users.filter((user: IEmployee) =>
          user.userOrganizations?.every((org) => org.userType !== 'OWNER')
        );

        setEmployees(filteredEmployees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [OrgId]);

  const breadcrumbItems = [{ href: '/employees', label: 'Employees' }];

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

  if (!employees) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <ErrorDisplay error="Failed to retrieve Employees" />
      </>
    );
  }

  return (
    <>
      <div className="overflow-hidden">
        <DashboardPageHeader pageTitle="Employees" />
        <div className="pt-6 pl-10 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="px-10 py-6 bg-white">
          <EmployeesTable employees={employees} />
        </div>
      </div>
    </>
  );
}

export default EmployeesPage;
