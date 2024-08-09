import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { GetLeadById, GetProductsByOrganization } from '@/lib/api_routes';

import BreadCrumb from './Breadcrumb';
import ClientView from './ClientView';
import { DashboardPageHeader } from './dashboard-page-header';
import ErrorDisplay from './ErrorDisplay';
import LeadView from './LeadView';
import LoadingSpinner from './LoadingSpinner';
import ProspectView from './ProspectView';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  businessName: string | null;
  contactPerson: string | null;
  secondaryContactPerson: string | null;
  secondaryContactNumber: string | null;
  secondaryContactEmail: string | null;
  leadEmail: string;
  phoneNumber: string;
  coordinates: Array<number>;
  preferredContactMethod: string | null;
  numberOfBranches: number | null;
  leadStatus: 'PROSPECT' | 'LEAD' | 'QUALIFIED' | 'CLOSED';
  businessType: 'HOME' | 'ENTERPRISE' | 'SOLUTIONS';
  location: string;
  description: string;
  userId: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  products: Array<{
    id: string;
    leadId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
  }>;
  title: string | null;
}

interface Product {
  id: string;
  name: string;
}

interface LeadDetailsProps {
  leadId: string | string[];
}

export interface LeadWithProductNames extends Lead {
  products: Array<{
    id: string;
    leadId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
    name: string;
  }>;
}

export default function LeadDetails({ leadId }: LeadDetailsProps) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (leadId) {
      fetchLeadDetailsAndProducts(leadId);
    }
  }, [leadId]);

  const fetchLeadDetailsAndProducts = async (id: string | string[]) => {
    setLoading(true);
    try {
      const [leadResponse, productsResponse] = await Promise.all([
        fetch(GetLeadById(id), {
          headers: {
            'Content-Type': 'application/json',
            'organization-id': localStorage.getItem('OrganizationId') || '',
          },
        }),
        fetch(GetProductsByOrganization, {
          headers: {
            'Content-Type': 'application/json',
            'organization-id': localStorage.getItem('OrganizationId') || '',
          },
        }),
      ]);

      if (!leadResponse.ok || !productsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const leadData = await leadResponse.json();
      const productsData = await productsResponse.json();

      setLead(leadData.data);
      setProducts(productsData.data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { href: '/leads', label: 'Leads' },
    { label: lead?.businessName || lead?.firstName || '' },
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
  if (!lead) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <ErrorDisplay error="Lead not found" />
      </>
    );
  }

  const leadProducts = lead.products.map((p) => {
    const product = products.find((prod) => prod.id === p.productId);
    return {
      ...p,
      name: product ? product.name : 'Unknown Product',
    };
  });

  const viewProps = {
    lead: {
      ...lead,
      products: leadProducts,
    } as LeadWithProductNames,
  };

  switch (lead.leadStatus) {
    case 'PROSPECT':
      return <ProspectView {...viewProps} />;
    case 'LEAD':
    case 'QUALIFIED':
      return <LeadView {...viewProps} />;
    case 'CLOSED':
      return <ClientView {...viewProps} />;
    default:
      return <div>Unknown lead status</div>;
  }
}
