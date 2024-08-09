'use client';

import { error } from 'console';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { SalesSummary } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ISalesSummary, SalesTable } from '@/components/Tables/SalesTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ReportPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get('userId');
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [report, setReport] = useState<ISalesSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>('2024-07-19');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const organizationId = localStorage.getItem('OrganizationId');
      setOrgId(organizationId);
    }
  }, []);

  useEffect(() => {
    const FetchSalesSummary = async () => {
      setLoading(true);
      try {
        const response = await fetch(SalesSummary(selectedDate), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'organization-id': `${OrgId}`,
          },
        });

        const data = await response.json();
       
        

        const retrievedReport = data.data.report;
    

        setReport(retrievedReport);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    if (OrgId) {
      FetchSalesSummary();
    }
  }, [id, OrgId, selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };
  const downloadReport = async () => {
    if (report) {
      try {
        const input = document.getElementById('report-content');
        if (!input) {
          console.error('Report content element not found');
          return;
        }

        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save(`report_${selectedDate}.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    } else {
      console.error('No report available to download');
    }
  };

  const breadcrumbItems = [{ href: '/insights', label: 'Insights' }];

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

  if (!report) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <ErrorDisplay error="Failed to load Report" />
      </>
    );
  }

  return (
    <>
      <div className="overflow-hidden">
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>

        <div className="m-8 shadow-sm bg-white grid grid-rows-1 p-10 rounded-md border border-gray-300 overflow-auto">
          <div className="header flex flex-col gap-4 md:flex-row justify-between p-4">
            <div className="flex gap-2">
              <h3 className="text-xl mt-2">Sales Summary</h3>
              <Badge
                className="rounded-full h-7 w-13 mt-2 p-4"
                variant="outline"
              >
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </Badge>
            </div>
            <div className="buttons flex flex-col md:flex-row justify-around gap-4">
              <Input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <Button onClick={downloadReport}>Download</Button>
            </div>
          </div>
          {report ? (
            <div id="report-content" className="mt-5">
              <SalesTable report={report} />
            </div>
          ) : (
            <div className="py-2">
              <p className="text-center">
                No Sales Summary,Set Targets for Organization to view
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportPage;
