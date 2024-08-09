'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Progress from '@/components/progress';
import { Button } from '@/components/ui/button';

function VerifiedEmail() {
  const router = useRouter();

  function handleClick() {
    router.push('/login');
  }

  return (
    <div className="flex flex-col justify-between w-auto  py-12 px-15 space-y-19 space-x-4">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Email verified successfully!
        </h1>
        <p className="mt-10 text-gray-500">Click continue to Login</p>
      </header>
      <section className="mt-10 justify-center px-40">
        <Image src="/verify.png" alt="VerifyEmail" width={100} height={1000} />
      </section>
      <section className="mt-4 text-center pr-4">
        <Button
          className="mt-8 w-full bg-teal-600 text-white rounded-md py-2 "
          onClick={handleClick}
        >
          Continue
        </Button>
      </section>
    </div>
  );
}

export default VerifiedEmail;
