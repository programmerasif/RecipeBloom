/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }: any) {
      try {
        console.log({ profile, account });

        if (!profile || !account) {
          return false;
        }

        if (account?.provider === "google") {
          const response: any = await fetch(
            `${process.env.NEXT_BASE_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              }),
              credentials: "include",
              cache: "no-store",
            }
          );

          const data = await response.json();
          console.log({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          });
          console.log(data?.data);
          console.log(data);

          if (data?.data?.accessToken || data?.data.refreshToken) {
            cookies().set("accessToken", data.data.accessToken);
            cookies().set("refreshToken", data.data.refreshToken);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET as string,
});

export { handler as GET, handler as POST };
