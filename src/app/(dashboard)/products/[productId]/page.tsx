'use client';

import { error } from 'console';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { GetLeadsByOrganization, GetProductById } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
  products: Array<{
    id: string;
    leadId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface Lead {
  id: string;
  firstName?: string;
  businessName?: string;
}

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;

      try {
        const [productResponse, leadsResponse] = await Promise.all([
          fetch(GetProductById(productId), {
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
        ]);

        if (!productResponse.ok || !leadsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productData = await productResponse.json();
        const leadsData = await leadsResponse.json();

        setProduct(productData.data.product);
        setLeads(leadsData.data.leads);
      } catch (error) {
        toast.error('Error fetching product details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const breadcrumbItems = [
    { href: '/products', label: 'Products' },
    { label: product?.name || '' },
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

  if (!product) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <ErrorDisplay error="No Product Found!" />
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

  const getLeadName = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    return lead ? lead.firstName || lead.businessName || 'Unknown' : 'Unknown';
  };

  return (
    <>
      <DashboardPageHeader pageTitle="Dashboard" />
      <div className="pt-6 pl-8 text-xl">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-500">
          Product Details
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  General Information
                </h2>
                <InfoItem label="Name" value={product.name} />
                <InfoItem label="Description" value={product.description} />
                <InfoItem label="Category" value={product.category} />
                <InfoItem
                  label="Unit Price"
                  value={formatCurrency(product.unitPrice)}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Additional Details
                </h2>
                <InfoItem
                  label="Created At"
                  value={formatDate(product.createdAt)}
                />
                <InfoItem
                  label="Updated At"
                  value={formatDate(product.updatedAt)}
                />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Associated Leads
              </h2>
              {product.products.length > 0 ? (
                <ul className="list-disc pl-5">
                  {product.products.map((p) => (
                    <li key={p.id} className="mb-2">
                      {getLeadName(p.leadId)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No leads associated with this product.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
