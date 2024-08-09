'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { FiFilter } from 'react-icons/fi';

import { GetLeadsByOrganization, GetUserLeads } from '@/lib/api_routes';

import AddLead from '@/components/AddLead';
import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PaginationDemo } from '@/components/Pagination';
import LeadsTable, { ILeads } from '@/components/Tables/LeadsTable';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Search from '@/components/user-search';

const ProspectsPage: React.FC = () => {
  const defaultStatus = 'PROSPECT';
  const [allLeads, setAllLeads] = useState<ILeads[]>([]);
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userType, setUserType] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const organizationId = localStorage.getItem('OrganizationId');
      const userType = localStorage.getItem('UserType');
      const userId = localStorage.getItem('UserId');
      setUserId(userId);
      setOrgId(organizationId);
      setUserType(userType);
    }
  }, []);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!OrgId || !userType || !userId) return;

      const apiEndpoint =
        userType === 'OWNER' || userType === 'ADMIN'
          ? GetLeadsByOrganization
          : GetUserLeads(userId);

      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': `${OrgId}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }

        const data = await response.json();
        if (!data || !data.data || !Array.isArray(data.data.leads)) {
          throw new Error('Invalid data format');
        }

        const filteredLeads = data.data.leads.filter(
          (lead: ILeads) => lead.leadStatus === 'PROSPECT'
        );

        setAllLeads(filteredLeads);
        setLeads(filteredLeads);
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

    fetchLeads();
  }, [OrgId, userType, userId]);

  useEffect(() => {
    const filterAndSearchLeads = () => {
      const filteredLeads = allLeads.filter((lead: ILeads) => {
        const categoryMatch = lead.businessType
          .toLowerCase()
          .includes(filterCategory.toLowerCase());
        const searchMatch =
          searchQuery === ''
            ? true
            : (lead.firstName &&
                lead.firstName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())) ||
              (lead.businessName &&
                lead.businessName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()));
        return categoryMatch && searchMatch;
      });

      setLeads(filteredLeads);
    };

    filterAndSearchLeads();
  }, [filterCategory, searchQuery, leads]);

  const breadcrumbItems = [{ href: '/prospects', label: 'Prospects' }];

  const totalPages = Math.ceil(leads.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterCategory(event.target.value);
    setCurrentPage(1);
  };

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
      <div className="overflow-hidden">
        <DashboardPageHeader pageTitle="Prospects" />
        <div className=" sticky pt-6 pl-8 text-xl w-full">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="m-8 shadow-sm bg-white grid grid-rows-1 p-4 rounded-md border border-gray-300 overflow-auto">
          <div className="header flex flex-col gap-4 p-4 mb-3 md:flex-row w-full justify-between items-center">
            <div className="flex gap-2 ">
              <h3 className="text-xl my-2">Prospects</h3>
              <Badge className="rounded-full bg-red-200 flex justify-center items-center p-2 w-8 h-8 mt-2">
                {leads.length || 0}
              </Badge>
            </div>
            <div className="w-[200px] md:w-[500px]">
              <Search value={searchQuery} onChange={handleSearchChange} />
            </div>
            <div className="relative w-60 rounded-2xl">
              <FiFilter className="absolute left-3 top-2.5 text-gray-400" />
              <Input
                placeholder="Filter by business type"
                className="pl-10"
                value={filterCategory}
                onChange={handleFilterChange}
              />
            </div>
            <AddLead type="Prospect" bType="HOME" />
          </div>
          <LeadsTable
            leads={leads}
            defaultStatus={defaultStatus}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <div className="pl-4 md:flex justify-between mt-2">
            <h3 className="text-md my-2">
              Show {Math.min(currentPage * itemsPerPage, leads.length)} results
              of {leads.length}
            </h3>
            <PaginationDemo
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProspectsPage;
