'use client';

import { REM } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

import { OrganizationProvider } from '@/contexts/organizations-context';
import { SessionProvider } from 'next-auth/react';

const rem = REM({
  subsets: ['latin'],
  weight: ['400', '700', '800', '100', '200', '300', '500', '600', '900'],
  variable: '--font-rem',
});

interface RootLayoutProps {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: RootLayoutProps) {
  return (
    <html lang="en" className={`${rem.variable} ${rem.className}`}>
      <SessionProvider session={session}>
        <OrganizationProvider>
          <body className="over-flow-auto bg-white ">{children}</body>
          <Toaster />
        </OrganizationProvider>
      </SessionProvider>
    </html>
  );
}
