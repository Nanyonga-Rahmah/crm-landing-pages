'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { FaBars, FaPeopleArrows } from 'react-icons/fa';
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
import { RxCross2 } from 'react-icons/rx';

import { GetUser } from '@/lib/api_routes';

import OrganizationName from './organization';
import AvatarIcon from './user-avatar';
import Message from './user-message';
import Notifications from './user-notification';
import Search from './user-search';

interface DashboardPageHeaderProps {
  pageTitle: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
}

export function DashboardPageHeader({ pageTitle }: DashboardPageHeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [engagementsOpen, setEngagementsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const UserId =
    typeof window !== 'undefined' ? localStorage.getItem('UserId') : null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(GetUser(UserId), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();

        setUser(data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [UserId]);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleEngagements = () => {
    setEngagementsOpen(!engagementsOpen);
  };

  return (
    <>
      <header className="sticky top-0 w-full z-20 flex items-center justify-between h-16 px-4 gap-4 shadow-sm bg-white border-b lg:px-8">
        <div className="flex items-center gap-4 lg:hidden">
          <button
            className="flex items-center space-x-2"
            onClick={toggleMobileMenu}
          >
            {showMobileMenu ? (
              <RxCross2 className="h-6 w-6 text-[#636060]" />
            ) : (
              <FaBars className="h-6 w-6 text-primary" />
            )}
            <span className="sr-only">menu</span>
          </button>
        </div>
        <OrganizationName />
        <Search />
        <div className="hidden lg:flex items-center gap-2">
          <Message />
          <Notifications />
          <AvatarIcon user={user} />
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-white transform ${
          showMobileMenu ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 lg:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 focus:outline-none"
          >
            <RxCross2 className="h-6 w-6 text-[#636060]" />
          </button>
        </div>
        <nav className="flex flex-col px-4 space-y-4 font-semibold text-[#636060]">
          <a
            href="/dashboard"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <LiaHomeSolid className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Dashboard</span>
          </a>
          <a
            href="/insights"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <MdOutlineSavedSearch className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Insights</span>
          </a>
          <a
            href="/employees"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <IoIosPeople className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Employees</span>
          </a>
          <a
            href="/department"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <MdOutlineFireHydrantAlt className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">
              Department
            </span>
          </a>
          <a
            href="/products"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <FiArchive className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Products</span>
          </a>
          <a
            href="/prospects"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <IoMdContacts className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Prospects</span>
          </a>
          <a
            href="/leads"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <IoIosContacts className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Leads</span>
          </a>
          <a
            href="/clients"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <IoIosContact className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Clients</span>
          </a>
          <div>
            <button
              onClick={toggleEngagements}
              className="flex items-center w-full py-2 hover:text-primary"
            >
              <FaPeopleArrows className="h-6 w-6 text-[#636060] hover:text-primary" />
              <span className="text-[#636060] hover:text-primary ml-2">
                Engagements
              </span>
              {engagementsOpen ? (
                <ChevronUpIcon className="h-4 w-4 ml-auto" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 ml-auto" />
              )}
            </button>
            {engagementsOpen && (
              <div className="ml-6 mt-2 space-y-2">
                <a
                  href="/visits"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <RiDoorOpenLine className="h-5 w-5 text-[#636060] hover:text-primary" />
                  <span className="text-[#636060] hover:text-primary">
                    Visits
                  </span>
                </a>
                <a
                  href="/proposals"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <PiSuitcaseSimpleBold className="h-5 w-5 text-[#636060] hover:text-primary" />
                  <span className="text-[#636060] hover:text-primary">
                    Proposals
                  </span>
                </a>
              </div>
            )}
          </div>
          <a
            href="/taskManager"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <LiaFileAltSolid className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">
              Task Manager
            </span>
          </a>
          <a
            href="/settings"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <MdOutlineSettings className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Settings</span>
          </a>
          <a
            href="/signOut"
            onClick={toggleMobileMenu}
            className="flex items-center gap-2 hover:text-primary"
          >
            <GoSignOut className="h-6 w-6 text-[#636060] hover:text-primary" />
            <span className="text-[#636060] hover:text-primary">Sign Out</span>
          </a>
        </nav>
      </div>
    </>
  );
}
