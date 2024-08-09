'use client';

import React, { useEffect, useState } from 'react';
import { BsSpeedometer2 } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import {
  MdKeyboardArrowDown,
  MdOutlineHandshake,
  MdOutlinePayments,
} from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AdminDashboard, UserDashboard } from '@/lib/api_routes';

import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import DashboardTable from '@/components/Tables/DashboardTable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import 'react-loading-skeleton/dist/skeleton.css';

import { useRouter } from 'next/navigation';

import { SetTargetDialog } from '@/components/SetTargetDialog';
import { Button } from '@/components/ui/button';

interface DashboardData {
  totalSales: number;
  totalSalesCount: number;
  topProducts?: Array<{
    productId: string;
    quantity: number;
    totalPrice: number;
    productName: string;
  }>;
  salesByMonth: Array<{
    month: number;
    year: number;
    totalSales: number;
  }>;
  currentMonthSales: {
    month: number;
    year: number;
    totalSales: number;
  };
  salesByYear: Array<{
    year: number;
    totalSales: number;
  }>;
  leadSegmentation: {
    leads: number;
    qualified: number;
    prospects: number;
    closed: number;
  };
  conversionRate: {
    conversionRate: number;
  };
}

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const organizationId = localStorage.getItem('OrganizationId');
      const userId = localStorage.getItem('UserId');
      const userType = localStorage.getItem('UserType');
      setOrgId(organizationId);
      setUserType(userType);
      setUserId(userId);
    }
  }, []);

  const handleViewReport = () => {
    if (userId) {
      router.push(`/report?userId=${userId}`);
    } else {
      console.error('User ID not found');
    }
  };

  const fetchDashboardData = async () => {
    if (!OrgId || !userType) return;

    const apiEndpoint =
      userType === 'OWNER' || userType === 'ADMIN'
        ? AdminDashboard
        : UserDashboard;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'organization-id': `${OrgId}`,
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.error || result.message || response.statusText);
      }

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Invalid data format');
      }

      setDashboardData(result.data);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
      setLoading(false);
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [OrgId, userType]);

  const formatYAxis = (tickItem: any) => {
    return `UGX${tickItem / 1000000}M`;
  };

  const COLORS = ['#C5C5C5', '#E5DAFB', '#884DFF', '#5E3FBE'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const prepareMonthlyData = (
    salesByMonth: Array<{
      month: number;
      year: number;
      totalSales: number;
    }> = []
  ) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const currentYear = new Date().getFullYear();

    return months.map((month, index) => {
      const matchingData = salesByMonth.find(
        (sale) => sale.month === index + 1 && sale.year === currentYear
      );
      return {
        month,
        totalSales: matchingData ? matchingData.totalSales : 0,
      };
    });
  };

  const preparePieChartData = (
    leadSegmentation: {
      leads: number;
      qualified: number;
      prospects: number;
      closed: number;
    } = { leads: 0, qualified: 0, prospects: 0, closed: 0 }
  ) => {
    const data = Object.entries(leadSegmentation)
      .map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value,
      }))
      .filter((item) => item.value > 0);

    return data.length > 0 ? data : [{ name: 'No Data', value: 1 }];
  };

  if (loading) {
    return (
      <>
        <DashboardPageHeader pageTitle="Dashboard" />
        <div className="flex pt-6 pl-8 text-xl justify-between">
          <BreadCrumb items={[{ label: 'Dashboard' }]} />
        </div>
        <div className="flex flex-wrap md:flex-nowrap pt-6 overflow-scroll px-8 space-y-6 md:space-y-0 md:space-x-10">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex w-full md:w-[350px] lg:w-[400px] h-[140px] rounded-md border border-gray-300 shadow-sm bg-white items-center"
              >
                <Skeleton height={140} width={'100%'} />
              </div>
            ))}
        </div>
        <div className="flex flex-wrap md:flex-nowrap pt-6 overflow-scroll px-8 space-y-6 md:space-y-0 md:space-x-10">
          <div className="flex flex-col w-full md:w-[750px] lg:w-[850px] h-auto rounded-md border border-gray-300 shadow-sm bg-white justify-center">
            <Skeleton height={450} width={'100%'} />
          </div>
          <div className="flex flex-col w-full md:w-[600px] lg:w-[700px] h-auto rounded-md border border-gray-300 shadow-sm bg-white">
            <Skeleton height={450} width={'100%'} />
          </div>
        </div>
        <div className="flex pt-6 px-8 pb-8">
          <Skeleton height={450} width={'100%'} />
        </div>
      </>
    );
  }

  const monthlyData = prepareMonthlyData(dashboardData?.salesByMonth);
  const leadSegmentationData = preparePieChartData(
    dashboardData?.leadSegmentation
  );

  return (
    <>
      <DashboardPageHeader pageTitle="Dashboard" />
      <div className="flex pt-6 pl-8 pr-10 text-xl justify-between items-center">
        <BreadCrumb items={[{ label: 'Dashboard' }]} />
        {userType === 'OWNER' && <SetTargetDialog />}
        {userType === 'USER' && (
          <Button onClick={handleViewReport}>View Report</Button>
        )}
      </div>
      <div className="flex flex-wrap md:flex-nowrap pt-6 overflow-scroll px-8 space-y-6 md:space-y-0 md:space-x-10">
        <div className="flex w-full md:w-[350px] lg:w-[400px] h-[140px] rounded-md border border-gray-300 shadow-sm bg-white items-center">
          <div className="flex w-full md:w-[173px] h-[57px] pl-2 items-center">
            <div className="flex rounded-full size-10 bg-gray-200 items-center justify-center">
              <MdOutlinePayments size={22} className="text-slate-500" />
            </div>
            <div className="flex flex-col pl-2">
              <span className="text-xs text-gray-500">TOTAL SALES</span>
              <span className="text-lg font-bold text-slate-800">
                UGX{' '}
                {(
                  (dashboardData?.currentMonthSales?.totalSales || 0) / 1000000
                ).toFixed(2)}
                M
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-[350px] lg:w-[400px] h-[140px] rounded-md border border-gray-300 shadow-sm bg-white items-center">
          <div className="flex w-full md:w-[180px] h-[57px] pl-2 items-center">
            <div className="flex rounded-full size-10 bg-gray-200 items-center justify-center">
              <FaRegUser size={22} className="text-slate-500" />
            </div>
            <div className="flex flex-col pl-2">
              <span className="text-xs text-gray-500">TOTAL CUSTOMERS</span>
              <span className="text-lg font-bold text-slate-800">
                {dashboardData?.leadSegmentation?.closed || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-[350px] lg:w-[400px] h-[140px] rounded-md border border-gray-300 shadow-sm bg-white items-center">
          <div className="flex w-full md:w-[153px] h-[57px] pl-2 items-center">
            <div className="flex rounded-full size-10 bg-gray-200 items-center justify-center">
              <MdOutlineHandshake size={22} className="text-slate-500" />
            </div>
            <div className="flex flex-col pl-2">
              <span className="text-xs text-gray-500">CLOSED DEALS</span>
              <span className="text-lg font-bold text-slate-800">
                {dashboardData?.totalSalesCount || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-[350px] lg:w-[400px] h-[140px] rounded-md border border-gray-300 shadow-sm bg-white items-center">
          <div className="flex w-full md:w-[180px] h-[57px] pl-2 items-center">
            <div className="flex rounded-full size-10 bg-gray-200 items-center justify-center">
              <BsSpeedometer2 size={22} className="text-slate-500 font-bold" />
            </div>
            <div className="flex flex-col pl-2">
              <span className="text-xs text-gray-500">CONVERSION RATE</span>
              <span className="text-lg font-bold text-slate-800">
                {dashboardData?.conversionRate?.conversionRate || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap pt-6 overflow-scroll px-8 space-y-6 md:space-y-0 md:space-x-10">
        <div className="flex flex-col w-full md:w-[750px] lg:w-[850px] h-auto rounded-md border border-gray-300 shadow-sm bg-white justify-center">
          <Card className="border-white w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="font-semibold text-lg">Sales History</h2>
              <span className="flex flex-row items-center text-xs text-gray-500 gap-2">
                <p>Year {new Date().getFullYear()}</p>
                <MdKeyboardArrowDown size={20} />
              </span>
            </CardHeader>
            <CardContent className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis tickFormatter={formatYAxis} className="text-xs" />
                  <Tooltip
                    formatter={(value) =>
                      `UGX ${((value as number) / 1000000).toFixed(2)}M`
                    }
                  />
                  <Bar
                    dataKey="totalSales"
                    fill="#00E096"
                    radius={[20, 20, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col w-full md:w-[600px] lg:w-[700px] h-auto rounded-md border border-gray-300 shadow-sm bg-white">
          <Card className="border-white w-full ">
            <CardHeader className="flex flex-row items-center">
              <h2 className="font-semibold text-lg">Lead Segmentation</h2>
            </CardHeader>
            <CardContent className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={100}>
                  <Pie
                    data={leadSegmentationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={135}
                    fill="#8884d8"
                    dataKey="value"
                    className="text-xs font-bold"
                  >
                    {leadSegmentationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    iconType="circle"
                    iconSize={15}
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: '15px', color: 'black' }}
                    formatter={(value) => (
                      <span style={{ color: 'black' }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      {userType === 'OWNER' ||
        (userType === 'ADMIN' && (
          <div className="flex pt-6 px-8 pb-8 ">
            <Card className="w-full md:max-w-[1370px] lg:max-w-[1590px] rounded-md border border-gray-300 shadow-sm">
              <CardContent className="overflow-x-auto">
                <DashboardTable
                  topProducts={dashboardData?.topProducts || []}
                />
              </CardContent>
            </Card>
          </div>
        ))}
    </>
  );
};

export default DashboardPage;
