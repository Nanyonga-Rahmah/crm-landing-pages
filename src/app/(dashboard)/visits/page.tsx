'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { FetchVisits, GetUserVisits } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import { VisitDialog } from '@/components/form/AddVisit';
import VisitsTable, { IVisits } from '@/components/Tables/VisitsTable';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const VisitsPage: React.FC = () => {
  const [visits, setVisits] = useState<IVisits[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    setOrgId(localStorage.getItem('OrganizationId'));
    setUserType(localStorage.getItem('UserType'));
  }, []);

  useEffect(() => {
    if (!OrgId || !userType) return;

    const apiEndpoint =
      userType === 'OWNER' || userType === 'ADMIN'
        ? FetchVisits
        : GetUserVisits;

    const fetchVisits = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': OrgId,
          },
        });

        const data = await response.json();

        const fetchedVisits = data.data.visits;
        setVisits(fetchedVisits);
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

    fetchVisits();
  }, [OrgId, visits]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const breadcrumbItems = [{ label: 'Visits' }];

  return (
    <>
      <DashboardPageHeader pageTitle="Dashboard" />
      <div className="pt-6 pl-10 text-xl">
        <BreadCrumb items={breadcrumbItems} />
      </div>

      <div className="m-8 shadow-sm bg-white grid grid-rows-1 p-4 rounded-md border border-gray-300  overflow-auto">
        <div className="header flex flex-col p-4 md:flex-row justify-between gap-4">
          <div className="flex gap-2 mb-2">
            <h3 className="text-xl mt-2">Visits</h3>
            <Badge className="rounded-full bg-red-200 flex justify-center items-center p-2 w-8 h-8 mt-2">
              {visits.length}
            </Badge>
          </div>
          <div className="buttons flex flex-col md:flex-row justify-around gap-4">
            <div className="flex p-2 bg-slate-100 rounded-full gap-2 h-2/4 md:h-3/4 overflow-hidden">
              <Image src="/search.svg" alt="Search" width={30} height={30} />
              <Input
                type="text"
                placeholder="Search"
                className="border-0 outline-none rounded-none w-3/4 h-auto bg-inherit"
              />
            </div>
            <VisitDialog />
          </div>
        </div>

        <VisitsTable visits={visits} />
      </div>
    </>
  );
};

export default VisitsPage;
