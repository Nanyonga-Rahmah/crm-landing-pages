'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'sonner';

import {
  GetLeadsByOrganization,
  GetProductsByOrganization,
  GetProposalById,
} from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Proposal {
  id: string;
  leadId: string;
  productId: string;
  proposedPrice: number;
  installationPrice: number;
  userId: string;
  organizationId: string;
  proposalTarget: string | null;
  additionalInformation: string;
  proposalDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  firstName?: string;
  businessName?: string;
}

interface Product {
  id: string;
  name: string;
}

export default function ProposalDetails() {
  const { proposalId } = useParams();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!proposalId) return;

      try {
        const [proposalResponse, leadsResponse, productsResponse] =
          await Promise.all([
            fetch(GetProposalById(proposalId), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'organization-id': localStorage.getItem('OrganizationId') || '',
              },
            }),
            fetch(GetLeadsByOrganization, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'organization-id': localStorage.getItem('OrganizationId') || '',
              },
            }),
            fetch(GetProductsByOrganization, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'organization-id': localStorage.getItem('OrganizationId') || '',
              },
            }),
          ]);

        if (!proposalResponse.ok || !leadsResponse.ok || !productsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const proposalData = await proposalResponse.json();
        const leadsData = await leadsResponse.json();
        const productsData = await productsResponse.json();

        console.log(proposalData);

        const proposal = proposalData.data.proposal;
        setProposal(proposal);

        const lead = leadsData.data.leads.find(
          (l: Lead) => l.id === proposal.leadId
        );
        setLead(lead || null);

        const product = productsData.data.products.find(
          (p: Product) => p.id === proposal.productId
        );
        setProduct(product || null);
      } catch (error) {
        toast.error('Error fetching proposal details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [proposalId]);

  const breadcrumbItems = [
    { href: '/proposals', label: 'Proposals' },
    { label: lead?.firstName || lead?.businessName || '' },
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

  if (!proposal) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <ErrorDisplay error="Proposal not Found" />
      </>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  function InfoItem({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) {
    return (
      <div className="mb-3">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="ml-2 text-gray-800">{value}</span>
      </div>
    );
  }

  return (
    <>
      <DashboardPageHeader pageTitle="Dashboard" />
      <div className="pt-6 pl-8 text-xl">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-col px-8 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-500">
          Proposal Details
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  General Information
                </h2>
                <InfoItem
                  label="Lead"
                  value={
                    lead
                      ? lead.firstName || lead.businessName || 'Unknown'
                      : 'Loading...'
                  }
                />
                <InfoItem
                  label="Product"
                  value={product ? product.name : 'Loading...'}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Pricing
                </h2>
                <InfoItem
                  label="Unit Price"
                  value={formatCurrency(proposal.proposedPrice)}
                />
                <InfoItem
                  label="Installation Price"
                  value={formatCurrency(proposal.installationPrice)}
                />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Additional Details
              </h2>
              <InfoItem
                label="Additional Information"
                value={proposal.additionalInformation}
              />
              <InfoItem
                label="Proposal Date"
                value={formatDate(proposal.proposalDate)}
              />
              <InfoItem
                label="Created At"
                value={formatDate(proposal.createdAt)}
              />
              <InfoItem
                label="Updated At"
                value={formatDate(proposal.updatedAt)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
