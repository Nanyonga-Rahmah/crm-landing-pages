'use client';

import React, { useEffect, useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { toast } from 'sonner';

import {
  GetAllProposals,
  GetLeadsByOrganization,
  GetProductsByOrganization,
  GetUserProposals,
} from '@/lib/api_routes';

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

import { Actions } from '../Actions';
import ErrorDisplay from '../ErrorDisplay';
import LoadingSpinner from '../LoadingSpinner';
import { PaginationDemo } from '../Pagination';
import { ProposalsDialog } from '../ProposalsDialog';
import { ILeads } from './LeadsTable';

interface Proposal {
  id: string;
  leadId: string;
  productId: string;
  proposedPrice: number | null;
  installationPrice: number;
  userId: string;
  organizationId: string;
  proposalTarget: string | null;
  additionalInformation: string;
  proposalDate: string;
  createdAt: string;
  updatedAt: string;
  leadName?: string;
  productName?: string;
}

const ProposalsTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const organizationId = localStorage.getItem('OrganizationId');
      const userType = localStorage.getItem('UserType');
      setOrgId(organizationId);
      setUserType(userType);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!OrgId || !userType) return;

      try {
        const apiEndpoint =
          userType === 'OWNER' || userType === 'ADMIN'
            ? GetAllProposals
            : GetUserProposals;

        const [proposalsResponse, leadsResponse, productsResponse] =
          await Promise.all([
            fetch(apiEndpoint, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'organization-id': OrgId,
                Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
              },
            }),
            fetch(GetLeadsByOrganization, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'organization-id': `${OrgId}`,
              },
            }),
            fetch(GetProductsByOrganization, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'organization-id': `${OrgId}`,
              },
            }),
          ]);

        if (
          !proposalsResponse.ok ||
          !leadsResponse.ok ||
          !productsResponse.ok
        ) {
          throw new Error('Failed to fetch data');
        }

        const proposalsData = await proposalsResponse.json();
        const leadsData = await leadsResponse.json();
        const productsData = await productsResponse.json();

        if (!proposalsData.success) {
          console.error('API error:', proposalsData.message);
          return;
        }

        const leads = leadsData.data.leads;
        const products = productsData.data.products.filter(
          (product: { category: string }) =>
            product.category === 'ENTERPRISE' ||
            product.category === 'SOLUTIONS'
        );

        const leadIdToName = leads.reduce(
          (acc: { [key: string]: string | undefined }, lead: ILeads) => {
            acc[lead.id] = lead.firstName || lead.businessName;
            return acc;
          },
          {}
        );

        const productIdToName = products.reduce(
          (
            acc: { [key: string]: string },
            product: { id: string; name: string }
          ) => {
            acc[product.id] = product.name;
            return acc;
          },
          {}
        );

        const enrichedProposals = proposalsData.data.proposals.map(
          (proposal: Proposal) => ({
            ...proposal,
            leadName: leadIdToName[proposal.leadId] || 'Unknown Lead',
            productName:
              productIdToName[proposal.productId] || 'Unknown Product',
          })
        );

        setProposals(enrichedProposals);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [OrgId, proposals]);

  const totalPages = Math.ceil(proposals.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredProposals = proposals.filter((proposal) =>
    Object.values(proposal).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedProposals = filteredProposals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <>
        <LoadingSpinner size="large" />
      </>
    );
  }

  if (!proposals) {
    return (
      <>
        <ErrorDisplay error="Failed to retrieve Proposals" />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col py-6 bg-white border-t border-x border-gray-300 rounded-t-lg shadow-sm overflow-hidden px-4 md:flex-row justify-between">
        <div className="header flex flex-col gap-2 p-4 mb-3 md:flex-row justify-between">
          <div className="flex gap-2">
            <h3 className="text-xl font-normal">Proposals</h3>
            <Badge className="rounded-full bg-red-200 flex justify-center items-center p-2 w-8 h-8">
              {filteredProposals.length}
            </Badge>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative w-48 rounded-2xl">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <Input
              placeholder="Search proposals"
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <ProposalsDialog />
        </div>
      </div>
      <div className="border-b border-x border-gray-300 rounded-b-lg shadow-sm overflow-hidden bg-white px-6">
        {filteredProposals.length > 0 ? (
          <>
            <Table className="w-full bg-white">
              <TableHeader>
                <TableRow className="gap-x-2">
                  <TableHead>#</TableHead>
                  <TableHead>Lead Name</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="text-center">
                    Proposed Price (UGX)
                  </TableHead>
                  <TableHead className="text-center">
                    Installation Price (UGX)
                  </TableHead>
                  <TableHead className="text-center">Proposal Date</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProposals.map((proposal, index) => (
                  <TableRow key={proposal.id} className="gap-x-2">
                    <TableCell className="text-sm font-semibold">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="p-2">{proposal.leadName}</TableCell>
                    <TableCell className="p-2">
                      {proposal.productName}
                    </TableCell>
                    <TableCell className="text-center p-2">
                      {proposal.proposedPrice
                        ? `${proposal.proposedPrice.toLocaleString()}`
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center p-2">
                      {proposal.installationPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center p-2">
                      {new Date(proposal.proposalDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex justify-center p-2">
                      <Actions proposalId={proposal.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
            <div className="p-4 md:flex justify-between mt-2">
              <h3 className="text-md my-2">
                Shows{' '}
                {Math.min(currentPage * itemsPerPage, filteredProposals.length)}{' '}
                proposals of {filteredProposals.length}
              </h3>
              <PaginationDemo
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full p-6">
            {loading ? (
              <p className="text-center text-sm font-medium mt-4 text-gray-500">
                Fetching...
              </p>
            ) : (
              <p className="text-center text-sm font-medium mt-4 text-gray-500">
                No proposals found. Add proposals or adjust your search.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProposalsTable;
