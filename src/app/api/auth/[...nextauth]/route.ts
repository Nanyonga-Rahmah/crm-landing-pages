import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { LogIn } from '@/lib/api_routes';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        const res = await fetch(LogIn, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.error);
        }

        if (res.ok && user) {
          return user;
        } else {
          throw Error(user.message);
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60,
  },

  pages: {
    signIn: '/login',
    signOut: '/signup',
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.token = token as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
