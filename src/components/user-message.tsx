import { JSX, SVGProps } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

export default function Message() {
  return (
    <div className="gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageCircleIcon className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="sm:max-w-[400px]">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Send a Message</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Write and send a message to your contacts.
              </p>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Type your message here..."
                className="resize-none"
                rows={0.5}
              />
              <Button type="submit" className="w-full">
                Send
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function MessageCircleIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
