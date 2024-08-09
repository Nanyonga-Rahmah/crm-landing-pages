'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ImProfile } from 'react-icons/im';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { IUser } from './dashboard-page-header';

interface AvatarIconProps {
  user: IUser;
}

export function getInitials(firstName: string, lastName: string) {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
}

export default function AvatarIcon({ user }: AvatarIconProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const HandleSignOut = () => {
    localStorage.clear();
    signOut({ callbackUrl: '/login' });
  };

  if (!user) {
    return (
      <Avatar className="cursor-pointer">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar className="cursor-pointer" onClick={toggleDropdown}>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          {isDropdownOpen && (
            <DropdownMenuContent align="end" className="w-max mt-2 py-3 px-5">
              <div className="grid gap-0.5 text-sm px-3 py-1">
                <div className="font-medium">{`${user.lastName} ${user.firstName}`}</div>
                <div className="text-gray-500 dark:text-gray-400">
                  {user.email}
                </div>
              </div>
              <DropdownMenuItem>
                <ImProfile className="mr-2 h-4 w-4" />
                <Link href="/settings"> View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={HandleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
    </div>
  );
}
