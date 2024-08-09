'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
        {
          'bg-primary text-white': isActive,
          'text-[#636060] hover:text-primary hover:bg-gray-100': !isActive,
          'dark:text-gray-50 dark:hover:text-gray-50 dark:hover:bg-gray-800':
            !isActive,
        }
      )}
    >
      {children}
    </Link>
  );
}
