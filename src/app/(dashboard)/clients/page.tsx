'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import { GetLeadsByOrganization, GetUserLeads } from '@/lib/api_routes';

import AddLead from '@/components/AddLead';
import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PaginationDemo } from '@/components/Pagination';
import LeadsTable, { ILeads } from '@/components/Tables/LeadsTable';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Search from '@/components/user-search';

const ClientsPage: React.FC = () => {
  const defaultStatus = 'CLOSED';
  const [allLeads, setAllLeads] = useState<ILeads[]>([]);
  const [leads, setLeads] = useState<ILeads[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('all');
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
    const fetchClients = async () => {
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
          throw new Error('Failed to fetch clients');
        }
        const data = await response.json();
        if (!data || !data.data || !Array.isArray(data.data.leads)) {
          throw new Error('Invalid data format');
        }
        const filteredClients = data.data.leads.filter(
          (lead: ILeads) => lead.leadStatus === 'CLOSED'
        );

        setAllLeads(filteredClients);
        setLeads(filteredClients);
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

    fetchClients();
  }, [OrgId]);

  useEffect(() => {
    const filterAndSearchLeads = () => {
      const filteredLeads = allLeads.filter((lead: ILeads) => {
        const typeMatch =
          activeTab === 'all'
            ? true
            : lead.businessType.toLowerCase() === activeTab;
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
        return typeMatch && searchMatch;
      });

      setLeads(filteredLeads);
    };

    filterAndSearchLeads();
  }, [activeTab, searchQuery, allLeads]);

  const breadcrumbItems = [{ href: '/clients', label: 'Clients' }];

  const totalPages = Math.ceil(leads.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
        <DashboardPageHeader pageTitle="Clients" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="m-8 shadow-sm bg-white grid grid-rows-1 p-10 rounded-md border border-gray-300 overflow-auto">
          <div className="header flex justify-between p-4 min-w-max">
            <div className="flex gap-2">
              <h3 className="text-xl mt-2">Clients</h3>
              <Badge className="rounded-full bg-red-200 flex justify-center items-center p-2 w-8 h-8 mt-2">
                {leads.length || 0}
              </Badge>
            </div>
            <div className="flex gap-3">
              <Search value={searchQuery} onChange={handleSearchChange} />
            </div>
          </div>
          <Tabs
            defaultValue="all"
            className="w-full my-4"
            onValueChange={handleTabChange}
          >
            <TabsList>
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="home">Home Clients</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise Clients</TabsTrigger>
              <TabsTrigger value="solutions">
                Software Service Clients
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <LeadsTable
                leads={leads}
                defaultStatus={defaultStatus}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </TabsContent>
            <TabsContent value="home">
              <LeadsTable
                leads={leads}
                defaultStatus={defaultStatus}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </TabsContent>
            <TabsContent value="enterprise">
              <LeadsTable
                leads={leads}
                defaultStatus={defaultStatus}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </TabsContent>
            <TabsContent value="solutions">
              <LeadsTable
                leads={leads}
                defaultStatus={defaultStatus}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between pl-4 mt-2">
            <h3 className="text-md">
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

export default ClientsPage;
