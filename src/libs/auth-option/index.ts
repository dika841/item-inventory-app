import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AxiosError } from "axios";
import { TError } from "@/common/types";
import { Login } from "@/api/auth/login-api";
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return {
        ...token,
        ...user,
      };
    },
    session: ({ session, token }) => {
      session.token = token.token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const authData = await Login({
            email: credentials?.email,
            password: credentials?.password,
          });
          return authData.data as User;
        } catch (error) {
          const axiosError = error as AxiosError<TError>;
          if (axiosError.response) {
            throw new Error(
              axiosError.response?.data?.error_message ||
                axiosError.message ||
                "Something went wrong"
            );
          }
        }
        return null;
      },
    }),
  ],
} as NextAuthOptions;
