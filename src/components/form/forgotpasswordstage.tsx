'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function ForgotPasswordStage() {
  const pathname = usePathname();

  return (
    <div className="relative py-5 pl-10 pr-40 rounded-l-xl">
      <div className="text-2xl font-bold">
        <span className="text-teal-600 text-md">Nova</span>
        <span className="text-md">CRM</span>
      </div>
      <ul className="space-y-10 relative pb-20 pt-20">
        <li className="flex items-center relative">
          <div
            className={`rounded-md border-2 p-2 ${pathname === '/forgotPassword' ? 'border-gray-700' : 'border-gray-400'}`}
          >
            <Image src="/person.svg" alt="person" width={24} height={24} />
          </div>
          <div className="ml-5">
            <p
              className={`font-bold ${pathname === '/forgotPassword' ? 'text-gray-700' : 'text-gray-400'}`}
            >
              Find Your Account
            </p>
            <p
              className={`text-sm font-light ${pathname === '/forgotPassword' ? 'text-gray-500' : 'text-gray-400'}`}
            >
              Email
            </p>
          </div>

          <div className="absolute left-5 top-full w-px h-10 bg-gray-400"></div>
        </li>
        <li className="flex items-center relative">
          <div
            className={`rounded-md border-2 p-2 ${pathname === '/reset-password' ? 'border-gray-700' : 'border-gray-400'}`}
          >
            <Image src="/email.svg" alt="email" width={24} height={24} />
          </div>
          <div className="ml-4">
            <p
              className={`font-bold ${pathname === '/reset-password' ? 'text-gray-700' : 'text-gray-400'}`}
            >
              Change Password
            </p>
            <p
              className={`text-sm font-light ${pathname === '/reset-password' ? 'text-gray-500' : 'text-gray-400'}`}
            >
              New Password
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ForgotPasswordStage;
