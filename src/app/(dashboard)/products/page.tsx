import BreadCrumb from '@/components/Breadcrumb';
import { DashboardPageHeader } from '@/components/dashboard-page-header';
import ProductsTable from '@/components/Tables/ProductsTable';

const ProductsPage: React.FC = () => {
  const breadcrumbItems = [{ href: '/products', label: 'Products' }];
  return (
    <>
      <div className="overflow-hidden">
        <DashboardPageHeader pageTitle="Products" />
        <div className="pt-6 pl-10 text-xl">
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="px-10 py-6 bg-white">
          <ProductsTable />
        </div>
      </div>
    </>
  );
};
export default ProductsPage;
