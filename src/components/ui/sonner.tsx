'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]: group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          error: 'bg-red-100 text-red-800 border border-red-400',
          success: 'bg-green-100 text-green-800 border border-green-400',
          warning: 'bg-yellow-100 text-yellow-800 border border-yellow-400',
          info: 'bg-blue-100 text-blue-800 border border-blue-400',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
