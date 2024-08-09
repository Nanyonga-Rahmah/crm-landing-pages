'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import EmailForm from '@/components/form/emailForm';

export default function ForgotPasswordPage() {
  return (
    <>
      <EmailForm />
    </>
  );
}
