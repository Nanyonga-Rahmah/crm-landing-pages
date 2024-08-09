import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ProposalsTable from '@/components/Tables/ProposalsTable';

const ProposalsPage: React.FC = () => {
  const breadcrumbItems = [{ label: 'Proposals' }];
  return (
    <>
      <DashboardPageHeader pageTitle="Proposals" />
      <div className="pt-6 pl-10 text-xl">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="px-10 py-6 bg-white">
        <ProposalsTable />
      </div>
    </>
  );
};
export default ProposalsPage;
