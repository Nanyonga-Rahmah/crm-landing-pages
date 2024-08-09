'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const ForbidenPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center flex-col p-20  bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-red-500">403 - Forbidden</h1>
      <h1 className="py-10 text-xl">Please login to access this page</h1>
      <Button onClick={handleLoginClick}>Login </Button>
    </div>
  );
};

export default ForbidenPage;
