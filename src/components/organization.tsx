'use client';

import React, { useEffect, useState } from 'react';

import { GetUserOrganizationById } from '@/lib/api_routes';

function OrganizationName() {
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const orgId = localStorage.getItem('OrganizationId');
    const token = localStorage.getItem('AccessToken');

    const fetchOrganization = async () => {
      try {
        if (!orgId || !token) {
          throw new Error(
            'OrganizationId or AccessToken is missing from localStorage'
          );
        }

        const response = await fetch(GetUserOrganizationById, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'organization-id': orgId,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch organization');
        }

        setOrganizationName(data.data.organization.name);
      } catch (error) {
        console.error('Error fetching organization:', error);
        setOrganizationName(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  if (isLoading) {
    return <div className="font-bold capitalize text-sm">Loading...</div>;
  }

  return (
    <div className="font-bold uppercase text-xs md:text-xl">
      {organizationName}
    </div>
  );
}

export default OrganizationName;
