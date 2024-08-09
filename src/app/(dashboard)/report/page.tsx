'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { GetReport, GetUser } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import { IEmployee } from '@/components/Tables/EmployeesTable';
import { IReport, ReportTable } from '@/components/Tables/ReportsTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ReportPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get('userId');
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [report, setReport] = useState<IReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>('2024-07-19');
  const [user, setuser] = useState<IEmployee | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const organizationId = localStorage.getItem('OrganizationId');
      setOrgId(organizationId);
    }
  }, []);

  useEffect(() => {
    const fetchReportAndUser = async () => {
      setLoading(true);
      try {
        const [reportResponse, userResponse] = await Promise.all([
          fetch(GetReport(id, selectedDate), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'organization-id': `${OrgId}`,
            },
          }),
          fetch(GetUser(id), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }),
        ]);

        const userData = await userResponse.json();
        const retrievedUser = userData.data;
        setuser(retrievedUser);

        const reportData = await reportResponse.json();
        const retrievedReport = reportData.data.report;
        
        setReport(retrievedReport);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (OrgId) {
      fetchReportAndUser();
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

  const breadcrumbItems = [
    { href: '/employees', label: 'Employees' },
    { href: '/report', label: 'Report' },
  ];

  return (
    <>
      <div className="overflow-hidden">
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="pt-6 pl-8 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>

        <div className="pt-5 px-10 text-xl">
          {loading ? '' : `Report for ${user?.lastName} ${user?.firstName}`}
        </div>
        <div className="m-8 shadow-sm bg-white grid grid-rows-1 p-5  rounded-md border border-gray-300 overflow-auto">
          <div className="header flex w-[50%] flex-col md:flex-row justify-between md:w-full md:p-4">
            <div className="flex gap-2 my-4 md:my-2">
              <h3 className="text-xl md:mt-2">Report</h3>
              <Badge
                className="rounded-full h-7 w-13 md:mt-2"
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
          {loading ? (
            <div className="py-2">
              <p className="text-center">Loading report...</p>
            </div>
          ) : report ? (
            <div id="report-content">
              <ReportTable report={report} />
            </div>
          ) : (
            <div className="py-2">
              <p className="text-center">No sales found for this user</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportPage;
