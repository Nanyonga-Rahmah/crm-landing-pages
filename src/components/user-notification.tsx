import { JSX, SVGProps, useState } from 'react';

import { Button } from '@/components/ui/button';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New order placed',
      description: 'You have a new order from John Doe.',
    },
    {
      id: 2,
      title: 'Account updated',
      description: 'Your account information has been updated.',
    },
    {
      id: 3,
      title: 'Payment received',
      description:
        'We have received your payment for the monthly subscription.',
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BellIcon className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
            {notifications.length}
          </span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
          <div className="p-2">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium">Notifications</h3>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start justify-between gap-2"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-24">
                      {notification.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleDismiss(notification.id)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BellIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
