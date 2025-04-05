"use client";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";
export const AuthSessionProvider = (props: PropsWithChildren) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};
