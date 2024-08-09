'use client';

import React, { useEffect, useState } from 'react';
import { IOrganization } from '@/contexts/organizations-context';

import { GetUserOrganizations } from '@/lib/api_routes';

import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import Organization from '@/components/Organizations';

function OrganizationPage() {
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [storedToken, setStoredToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('AccessToken');
      setStoredToken(token);
    }
  }, []);

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(GetUserOrganizations, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const organizations = data.data.organizations;

        setOrganizations((prevOrganizations) => {
          const filteredOrganizations = organizations.filter(
            (item: any) => item !== null
          ) as IOrganization[];
          return [...filteredOrganizations];
        });
        setError(null);
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
        setError('Failed to fetch organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [storedToken]);

  if (loading) {
    return (
      <>
        <LoadingSpinner size="large" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ErrorDisplay error={error} />
      </>
    );
  }

  return <Organization organizations={organizations} />;
}

export default OrganizationPage;
