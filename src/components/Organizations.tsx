'use client';

import { useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  IOrganization,
  OrganizationContext,
} from '@/contexts/organizations-context';

interface OrganizationsProps {
  organizations: IOrganization[];
}

export default function Organization({ organizations }: OrganizationsProps) {
  const { selectOrganization } = useContext(OrganizationContext)!;
  const router = useRouter();

  function handleSelectOrganization(organization: IOrganization) {
    selectOrganization(organization);
    const userId = localStorage.getItem('UserId');
    const userOrg: any = organization.userOrganizations.find(
      (organization) => organization.userId === userId
    );
    localStorage.setItem('OrganizationId', userOrg.organizationId);
    localStorage.setItem('UserType', userOrg.userType);
    router.push('/dashboard');
  }

  return (
    <div className="w-[800px] mx-auto my-8 sm:my-16 md:my-24 lg:my-48 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="text-lg sm:text-xl font-semibold leading-6 text-gray-900 mb-4 sm:mb-0">
          Select an organization you would like to view
        </div>
        <Link href="/addCompany">
          <p className="text-primary text-sm font-light hover:underline">
            Create an Organization
          </p>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {organizations?.map((organization: IOrganization) => (
          <div
            key={organization?.id}
            tabIndex={0}
            className="border-gray-300 focusable-card
            relative flex cursor-pointer rounded-lg border p-4 shadow-sm
            hover:shadow-md transition-shadow duration-200 ease-in-out"
            onClick={() => handleSelectOrganization(organization)}
          >
            <span className="flex flex-1">
              <span className="flex flex-col">
                <span className="block text-sm font-medium text-gray-900 mb-1">
                  {organization?.name}
                </span>
                <span className="text-xs text-gray-500 mb-2">
                  {organization?.organizationEmail}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {organization?.phoneNumber}
                </span>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
