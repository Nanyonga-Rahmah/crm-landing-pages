import React, { ChangeEvent, JSX, SVGProps } from 'react';

import { Input } from '@/components/ui/input';

interface SearchProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <Input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search here..."
        className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default Search;
