import React from 'react';
import Image from 'next/image';

function LoginStage() {
  return (
    <div className="relative py-5 pl-10 pr-40 rounded-l-xl">
      <div className="text-2xl font-bold">
        <span className="text-teal-600 text-md">Nova</span>
        <span className="text-md">CRM</span>
      </div>
      <ul className="space-y-10 relative pb-20 pt-20">
        <li className="flex items-center relative">
          <div className="rounded-md border-2 border-gray-400 p-2">
            <Image src="/person.svg" alt="person" width={24} height={24} />
          </div>
          <div className="ml-5">
            <span className="font-bold text-gray-400">Register</span>
            <span className="block text-sm font-light text-gray-500">
              Name, Email and Password
            </span>
          </div>
          <div className="absolute left-5 top-full w-px h-10 bg-gray-400"></div>
        </li>
        <li className="flex items-center relative">
          <div className="rounded-md border-2 border-gray-500 p-2">
            <Image src="/email.svg" alt="email" width={24} height={24} />
          </div>
          <div className="ml-4">
            <span className="font-bold text-gray-400">Verify Email</span>
            <span className="block text-sm font-light text-gray-400">
              Check your email for verification
            </span>
          </div>
          <div className="absolute left-5 top-full w-px h-10 bg-gray-400"></div>
        </li>
        <li className="flex items-center relative">
          <div className="rounded-md border-2 border-gray-700 p-2 bg-white">
            <Image src="/rocket.svg" alt="rocket" width={28} height={24} />
          </div>
          <div className="ml-4">
            <span className="font-bold text-gray-700">Login</span>
            <span className="block text-sm font-light text-gray-500">
              Fill in your credentials
            </span>
          </div>
          <div className="absolute left-5 top-full w-px h-10 bg-gray-400"></div>
        </li>
        <li className="flex items-center relative">
          <div className="rounded-md border-2 border-gray-400 p-2 bg-white">
            <Image src="/groups.svg" alt="groups" width={28} height={24} />
          </div>
          <div className="ml-4">
            <span className="font-bold text-gray-400">
              Add Company/Organization
            </span>
            <span className="block text-sm font-light text-gray-400">
              Add company/Organization
            </span>
          </div>
          <div className="absolute left-5 top-full w-px h-10 bg-gray-400"></div>
        </li>
        <li className="flex items-center relative">
          <div className="rounded-md border-2 border-gray-400 p-2 bg-white">
            <Image src="/rocket.svg" alt="rocket" width={28} height={24} />
          </div>
          <div className="ml-4">
            <span className="font-bold text-gray-400">Welcome to NovaCRM</span>
            <span className="block text-sm font-light text-gray-400">
              Get up and running in 2 minutes
            </span>
          </div>
        </li>
      </ul>
      <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-80">
        <a href="/" className="text-sm hover:underline text-teal-600">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default LoginStage;
