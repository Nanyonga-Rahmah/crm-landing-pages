'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import ChangePasswordForm from '@/components/form/ChangePassword';

export default function ChangePasswordPage() {
  return (
    <>
      <ChangePasswordForm />
    </>
  );
}
