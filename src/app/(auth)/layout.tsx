import '../globals.css';

import { REM } from 'next/font/google';

const rem = REM({
  subsets: ['latin'],
  weight: ['400', '700'],
});

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`p-4 sm:p-10 md:p-20 ${rem.className} min-h-screen flex items-center justify-center `}
    >
      <div className="rounded-md bg-white w-full max-w-md border border-solid drop-shadow overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
