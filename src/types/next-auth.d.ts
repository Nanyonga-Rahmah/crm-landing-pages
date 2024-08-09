// import NextAuth from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       message: string;
//       success: boolean;
//       token: string;
//       user: any;
//     };
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     token?: string;
//   }
// }
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      message: string;
      success: boolean;
      user: any;
      token: any;
    };
  }
}
