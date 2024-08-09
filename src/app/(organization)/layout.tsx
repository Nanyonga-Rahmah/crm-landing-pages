'use client';

import type { Metadata } from 'next';
import { REM } from 'next/font/google';

const rem = REM({
  subsets: ['latin'],
  weight: ['400', '700', '800', '100', '200', '300', '500', '600', '900'],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rem.className}>
      <body className="  ">{children}</body>
    </html>
  );
}
