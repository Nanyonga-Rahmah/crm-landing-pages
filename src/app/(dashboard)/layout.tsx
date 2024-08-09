'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from 'lucide-react';
import { FaPeopleArrows } from 'react-icons/fa';
import { FiArchive } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import {
  IoIosContact,
  IoIosContacts,
  IoIosPeople,
  IoMdContacts,
} from 'react-icons/io';
import { LiaFileAltSolid, LiaHomeSolid } from 'react-icons/lia';
import {
  MdOutlineFireHydrantAlt,
  MdOutlineSavedSearch,
  MdOutlineSettings,
} from 'react-icons/md';
import { PiSuitcaseSimpleBold } from 'react-icons/pi';
import { RiDoorOpenLine } from 'react-icons/ri';

import { NavItem } from '@/components/nav-item';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [engagementsOpen, setEngagementsOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('UserType');
      setUserType(userType);
    }
  }, []);

  const toggleSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  const toggleEngagements = () => {
    setEngagementsOpen(!engagementsOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <aside
        className={`bg-white hidden shadow-sm border-r flex-col lg:fixed lg:flex lg:flex-col lg:inset-y-0 lg:z-50 py-3 ${
          isCollapsed ? 'w-20' : 'w-[280px]'
        }`}
      >
        <a href="/dashboard">
          <div className="flex h-[52px] justify-between items-center px-6">
            <div className="flex items-center mb-2 gap-2 font-semibold p-2">
              {!isCollapsed && (
                <Image
                  width={80}
                  height={80}
                  src="/images/logo.png"
                  alt="nova"
                />
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 focus:outline-none"
            >
              {isCollapsed ? (
                <ChevronRightIcon className="h-6 w-6 text-[#636060]" />
              ) : (
                <ChevronLeftIcon className="h-6 w-6 ml-2 text-[#636060]" />
              )}
            </button>
          </div>
        </a>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium text-[#636060]">
            <NavItem href="/dashboard">
              <LiaHomeSolid className="h-6 w-6" />
              {!isCollapsed && <span>Dashboard</span>}
            </NavItem>
            {userType === 'OWNER' && (
              <NavItem href="/insights">
                <MdOutlineSavedSearch className="h-6 w-6" />
                {!isCollapsed && <span>Insights</span>}
              </NavItem>
            )}
            <NavItem href="/employees">
              <IoIosPeople className="h-6 w-6" />
              {!isCollapsed && <span>Employees</span>}
            </NavItem>
            <NavItem href="/department">
              <MdOutlineFireHydrantAlt className="h-6 w-6" />
              {!isCollapsed && <span>Departments</span>}
            </NavItem>
            <NavItem href="/products">
              <FiArchive className="h-6 w-6" />
              {!isCollapsed && <span>Products</span>}
            </NavItem>
            <NavItem href="/prospects">
              <IoMdContacts className="h-6 w-6" />
              {!isCollapsed && <span>Prospects</span>}
            </NavItem>
            <NavItem href="/leads">
              <IoIosContacts className="h-6 w-6" />
              {!isCollapsed && <span>Leads</span>}
            </NavItem>
            <NavItem href="/clients">
              <IoIosContact className="h-6 w-6" />
              {!isCollapsed && <span>Clients</span>}
            </NavItem>
            <div>
              <button
                onClick={toggleEngagements}
                className="flex items-center w-full hover:text-primary pl-4 py-2"
              >
                <FaPeopleArrows className="h-6 w-6" />
                {!isCollapsed && (
                  <>
                    <span className="ml-2">Engagements</span>
                    {engagementsOpen ? (
                      <ChevronUpIcon className="h-4 w-4 ml-2" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 ml-2" />
                    )}
                  </>
                )}
              </button>
              {engagementsOpen && !isCollapsed && (
                <div className="ml-2 mt-2">
                  <NavItem href="/visits">
                    <RiDoorOpenLine className="h-4 w-4" />
                    <span className="ml-2">Visits</span>
                  </NavItem>
                  <NavItem href="/proposals">
                    <PiSuitcaseSimpleBold className="h-4 w-4" />
                    <span className="ml-2">Proposals</span>
                  </NavItem>
                </div>
              )}
            </div>
            <NavItem href="/taskManager">
              <LiaFileAltSolid className="h-6 w-6" />
              {!isCollapsed && <span>Task Manager</span>}
            </NavItem>
            <NavItem href="/settings">
              <MdOutlineSettings className="h-6 w-6" />
              {!isCollapsed && <span>Settings</span>}
            </NavItem>
            <NavItem href="/signOut">
              <GoSignOut className="h-6 w-6" />
              {!isCollapsed && <span>Sign Out</span>}
            </NavItem>
          </nav>
        </div>
      </aside>
      <main
        className={`bg-white ${isCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'}`}
      >
        {children}
      </main>
    </div>
  );
}
