'use client';

import React, { useEffect, useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

import { GetProducts } from '@/lib/api_routes';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Actions } from '../Actions';
import { ProductDialog } from '../AddProduct';
import { PaginationDemo } from '../Pagination';

export interface IProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  unitPrice: number;
}

const ProductsTable: React.FC<{}> = () => {
  const [OrgId, setOrgId] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('UserType');
      setUserType(userType);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const organizationId = localStorage.getItem('OrganizationId');
      setOrgId(organizationId);
    }
  }, []);

  useEffect(() => {
    const FetchProducts = async () => {
      if (!OrgId) {
        console.error('Organization ID is null');
        setLoading(true);
        return;
      }

      const response = await fetch(GetProducts, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'organization-id': OrgId,
        },
      });

      const data = await response.json();

      if (data.success) {
        const filteredProducts = data.data.products.filter(
          (product: IProduct) =>
            product.category
              .toLowerCase()
              .includes(filterCategory.toLowerCase())
        );
        setProducts(filteredProducts);
      } else {
        console.error('API error:', data.error);
      }

      setLoading(false);
    };
    FetchProducts();
  }, [OrgId, products]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCategory(event.target.value);
    setCurrentPage(1);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isOwner = userType === 'OWNER';

  return (
    <>
      <div className="flex flex-col  py-6 bg-white border-t border-x border-gray-300 rounded-t-lg shadow-sm overflow-hidden  px-4 md:flex-row justify-between">
        <div className="header flex flex-col gap-2 p-4 mb-3 md:flex-row justify-between">
          <div className="flex gap-2">
            <h3 className="text-xl font-normal">Products</h3>
            <Badge className="rounded-full bg-red-200 flex justify-center items-center p-2 w-8 h-8 ">
              {products.length || 0}
            </Badge>
          </div>
        </div>
        <div className="flex  gap-4  ">
          <div className="relative w-48 rounded-2xl">
            <FiFilter className="absolute left-3 top-2.5 text-gray-400" />
            <Input
              placeholder="Filter by category"
              className="pl-10"
              value={filterCategory}
              onChange={handleFilterChange}
            />
          </div>
          {isOwner && <ProductDialog />}
        </div>
      </div>
      <div className="border-b border-x border-gray-300 rounded-b-lg shadow-sm overflow-hidden bg-white px-6">
        {products.length > 0 ? (
          <>
            <Table className="w-full bg-white">
              <TableHeader>
                <TableRow className="gap-x-2">
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Category</TableHead>
                  <TableHead className="text-center">Unit Price</TableHead>
                  {isOwner && (
                    <TableHead className="text-center">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product, index) => (
                  <TableRow key={product.id} className="gap-x-2">
                    <TableCell className="text-sm font-semibold">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="p-2">{product.name}</TableCell>
                    <TableCell className="text-center p-2">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-center p-2">
                      {product.unitPrice}
                    </TableCell>
                    {isOwner && (
                      <TableCell className="flex justify-center p-2">
                        <Actions product={product} productId={product.id} />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
            <div className="p-4 md:flex justify-between mt-2">
              <h3 className="text-md my-2">
                Shows {Math.min(currentPage * itemsPerPage, products.length)}{' '}
                products of {products.length}
              </h3>
              <PaginationDemo
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full p-6">
            {loading ? (
              <p className="text-center text-sm font-medium mt-4 text-gray-500">
                Fetching...
              </p>
            ) : (
              <p className="text-center text-sm font-medium mt-4 text-gray-500">
                {isOwner
                  ? ' No products found, Add products'
                  : 'No products found'}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsTable;
