'use client';

import React, { useEffect, useState } from 'react';

import { GetUser } from '@/lib/api_routes';

import { DashboardPageHeader, IUser } from '@/components/dashboard-page-header';
import Settings from '@/components/Settings';

const SettingsPage: React.FC = () => {
  const [user, setUser] = useState<IUser | undefined>();

  const UserId =
    typeof window !== 'undefined' ? localStorage.getItem('UserId') : null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(GetUser(UserId), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();

        setUser(data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [UserId]);

  return (
    <>
      <DashboardPageHeader pageTitle="Dashboard" />
      {user && <Settings {...user} />}
    </>
  );
};

export default SettingsPage;
