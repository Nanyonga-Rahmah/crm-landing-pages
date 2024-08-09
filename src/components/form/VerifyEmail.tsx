'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useLocalStorage } from '@/hooks/useLocalStorage';

function VerifyEmail() {
  const [email] = useLocalStorage('userEmail', '');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between px-10 py-10 space-y-8 will-change-auto -mt-12 ">
      <header className="text-center pt-10">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <div className="mt-4  text-gray-500 ">
          <span className="pr-2 pb-20">We have sent an email to</span>
          <span className="font-bold pt-20">{email}</span>
        </div>
        <p className="mt-4 text-gray-500">Open it and click verify</p>
      </header>
      <section className="flex justify-center">
        <Image src="/verify.png" alt="VerifyEmail" width={200} height={1000} />
      </section>
    </div>
  );
}

export default VerifyEmail;
