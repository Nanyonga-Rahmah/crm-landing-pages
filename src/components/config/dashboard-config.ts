import { CgInsights } from 'react-icons/cg';
import { CiHome } from 'react-icons/ci';
import { FiArchive } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import { IoIosContact, IoIosContacts, IoMdContacts } from 'react-icons/io';
import { LiaFileAltSolid } from 'react-icons/lia';
import {
  MdContacts,
  MdOutlineFireHydrantAlt,
  MdOutlineSavedSearch,
  MdOutlineSettings,
} from 'react-icons/md';

import { DashboardConfig } from '../../types';

export const dashboardConfig: DashboardConfig = {
  mobileNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'CiHome',
    },
    {
      title: 'Insights',
      href: '/insights',
      icon: 'MdOutlineSavedSearch',
    },
    {
      title: 'Department',
      href: '/department',
      icon: 'MdOutlineFireHydrantAlt',
    },
    {
      title: 'Products',
      href: '/products',
      icon: 'FiArchive',
    },

    {
      title: 'Prospects',
      href: '/prospects',
      icon: 'IoMdContacts',
    },
    {
      title: 'Leads',
      href: '/leads',
      icon: 'IoIosContacts',
    },

    {
      title: 'Clients',
      href: '/clients',
      icon: 'IoIosContact',
    },
    {
      title: 'Engagements',

      icon: 'IoIosContact',
      subMenu: true,
      submenuItems: [
        {
          title: 'Visits',
          href: '/visits',
          icon: 'IoMdContacts',
        },
        {
          title: 'Proposals',
          href: '/proposals',
          icon: 'IoIosContacts',
        },
      ],
    },

    {
      title: 'Task Manager',
      href: '/taskManager',
      icon: 'LiaFileAltSolid',
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: 'MdOutlineSettings',
    },
    {
      title: 'Sign Out',
      href: '/signOut',
      icon: 'GoSignOut',
    },
  ],
};
