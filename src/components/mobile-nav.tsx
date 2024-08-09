import * as React from 'react';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { Icons } from '@/components/icons';
import { FaArrowRight } from 'react-icons/fa';

import { cn } from '@/lib/utils';

interface MobileNavProps {
  items: MenuNavItem[];
  children?: React.ReactNode;
}
interface MenuNavItem {
  href: Url;
  title: string;
  disabled?: boolean;
  external?: boolean;
  submenu?: boolean;
  submenuItems?: [];
  icon?: keyof typeof FaArrowRight;
  permissionRequired?: any;
}

export function MobileNav({ items, children }: MobileNavProps) {
  const path = usePathname();
  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row space-y-2 auto-rows-max text-sm">
          {items.map((item, index) => {
            return (
              item.href && (
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                    path === item.href && 'text-primary bg-accent',
                    item.disabled && 'cursor-not-allowed opacity-60'
                  )}
                >
                  {item.title}
                </Link>
              )
            );
          })}
        </nav>
        {children}
      </div>
    </div>
  );
}
