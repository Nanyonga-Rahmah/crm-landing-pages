import { ReactNode } from 'react';

export interface NavItem {
  title: string;
  href?: string;
  icon: ReactNode;
  submenuItems?: NavItem[];
  subMenu?: boolean;
}

export interface DashboardConfig {
  mobileNav: NavItem[];
}
