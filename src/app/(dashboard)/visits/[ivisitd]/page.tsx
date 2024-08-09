'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';

import { FetchVisit } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';

interface Visit {
  id: string;
  leadId: string;
  firstName: string | null;
  businessName: string | null;
  companyContactPerson: string | null;
  visitDate: string;
  location: string;
  visitType: string;
  userId: string;
  organizationId: string;
  additionalInformation: string;
  createdAt: string;
  updatedAt: string;
}

interface VisitResponse {
  success: boolean;
  message: string;
  data: {
    user: string;
    visit: Visit;
  };
}

export default function VisitDetails() {
  const { visitId } = useParams();
  const [visit, setVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const visitIdString = Array.isArray(visitId) ? visitId[0] : visitId;
      if (!visitIdString) return;

      try {
        const response = await fetch(FetchVisit(visitIdString), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': localStorage.getItem('OrganizationId') || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch visit details');
        }

        const data: VisitResponse = await response.json();
        setVisit(data.data.visit);
      } catch (error) {
        toast.error('Error fetching visit details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [visitId]);

  const breadcrumbItems = [
    { href: '/visits', label: 'Visits' },
    { label: visit?.firstName || visit?.businessName || '' },
  ];

  if (loading) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="flex justify-center items-center h-screen">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <Image src="/images/logo.png" width={65} height={40} alt="nova" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!visit) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-semibold text-gray-700 flex justify-center items-center">
          Visit not found
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  };

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  function InfoItem({
    label,
    value,
  }: {
    label: string;
    value: string | number | null;
  }) {
    return (
      <div className="mb-3">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="ml-2 text-gray-800">{value || 'N/A'}</span>
      </div>
    );
  }

  return (
    <>
      <DashboardPageHeader pageTitle="Dashboard" />
      <div className="pt-6 pl-8 text-xl">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-500">Visit Details</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  General Information
                </h2>
                <InfoItem
                  label="Lead Name"
                  value={visit.firstName || visit.businessName}
                />
                <InfoItem
                  label="Company Contact Person"
                  value={visit.companyContactPerson}
                />
                <InfoItem label="Location" value={visit.location} />
                <InfoItem label="Visit Type" value={visit.visitType} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Visit Details
                </h2>
                <InfoItem
                  label="Visit Date"
                  value={formatDate(visit.visitDate)}
                />
                <InfoItem
                  label="Visit Time"
                  value={formatTime(visit.visitDate)}
                />
                <InfoItem
                  label="Additional Information"
                  value={visit.additionalInformation}
                />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Additional Details
              </h2>
              <InfoItem
                label="Created At"
                value={formatDate(visit.createdAt)}
              />
              <InfoItem
                label="Updated At"
                value={formatDate(visit.updatedAt)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
