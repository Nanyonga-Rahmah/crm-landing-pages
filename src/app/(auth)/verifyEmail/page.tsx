import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const VerifyEmail = dynamic(() => import('@/components/form/VerifyEmail'), {
  suspense: true,
});

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default Page;
