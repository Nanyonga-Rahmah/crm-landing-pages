'use client';

import React from 'react';
import { format } from 'date-fns';

import { LeadWithProductNames } from '@/components/LeadDetails';

interface LeadViewProps {
  lead: LeadWithProductNames;
}

export default function LeadView({ lead }: LeadViewProps) {
  function InfoItem({
    label,
    value,
  }: {
    label: string;
    value: string | number | React.ReactNode;
  }) {
    return (
      <div className="mb-3">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="ml-2 text-gray-800">{value}</span>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  return (
    <div className="flex flex-col px-6 py-2">
      <h1 className="text-2xl font-bold mb-6 text-gray-500">Lead Details</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Personal Information
              </h2>
              <InfoItem
                label="Names"
                value={
                  (lead.firstName && lead.middleName && lead.lastName) || 'N/A'
                }
              />
              <InfoItem
                label="Business Name"
                value={lead.businessName || 'N/A'}
              />
              <InfoItem label="Email" value={lead.leadEmail} />
              <InfoItem label="Phone" value={lead.phoneNumber} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Secondary Contact
              </h2>
              <InfoItem
                label="Contact Person"
                value={lead.secondaryContactPerson || 'N/A'}
              />
              <InfoItem
                label="Phone"
                value={lead.secondaryContactNumber || 'N/A'}
              />
              <InfoItem
                label="Email"
                value={lead.secondaryContactEmail || 'N/A'}
              />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Business Details
            </h2>
            <InfoItem label="Business Type" value={lead.businessType} />
            <InfoItem label="Location" value={lead.location} />
            <InfoItem label="Description" value={lead.description} />
            <InfoItem label="Converted At" value={formatDate(lead.updatedAt)} />
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Associated Products
            </h2>
            {lead.products.length > 0 ? (
              <ul className="list-disc pl-5">
                {lead.products.map((product) => (
                  <li key={product.id} className="text-gray-800">
                    {product.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800">
                No products associated with this Lead.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
