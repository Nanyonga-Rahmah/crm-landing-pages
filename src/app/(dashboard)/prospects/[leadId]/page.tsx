'use client';

import { useParams } from 'next/navigation';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import LeadDetails from '@/components/LeadDetails';

export default function LeadPage() {
  const params = useParams();
  const leadId = params.leadId as string;

  const breadcrumbItems = [{ href: '/prospects', label: 'Prospects' }];

  return (
    <>
      <DashboardPageHeader pageTitle="Lead Details" />
      <div className="pt-6 pl-8 text-xl">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="container mx-auto px-4 py-8">
        {leadId ? <LeadDetails leadId={leadId} /> : <div>Invalid lead ID</div>}
      </div>
    </>
  );
}
