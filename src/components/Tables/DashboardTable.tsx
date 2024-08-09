'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TopProduct {
  productId: string;
  quantity: number;
  totalPrice: number;
  productName: string;
}

interface DashboardTableProps {
  topProducts: TopProduct[];
}

const DashboardTable: React.FC<DashboardTableProps> = ({ topProducts }) => {
  return (
    <>
      <div className="flex flex-col pt-4 pb-2 bg-white shadow-sm overflow-hidden px-4 md:flex-row justify-between w-full items-center">
        <div className="header flex flex-col gap-2 p-4 mb-3 md:flex-row justify-between">
          <div className="flex gap-2">
            <h2 className="text-2xl font-semibold">Popular Products</h2>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white px-6">
        {topProducts.length > 0 ? (
          <Table className="w-full bg-white">
            <TableHeader className="bg-gray-100">
              <TableRow className="gap-x-2">
                <TableHead>#</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Total Sale (UGX)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={product.productId} className="gap-x-2">
                  <TableCell className="text-sm font-semibold">
                    {index + 1}
                  </TableCell>
                  <TableCell className="p-2">{product.productName}</TableCell>
                  <TableCell className="text-center p-2">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-center p-2">
                    {(product.totalPrice / 1000000).toFixed(2)}M
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="bg-white rounded-b-lg">
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-start text-xs text-gray-400"
                >
                  Shows {topProducts.length}{' '}
                  {topProducts.length === 1 ? 'result' : 'results'}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <div className="flex justify-center items-center h-full p-6">
            <p className="text-center text-sm font-medium mt-4 text-gray-500">
              No products found
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardTable;
