import { TAccount, TAuthUser } from "@/common/types/auth";

declare module "next-auth" {
  interface Session {
    users?: TAccount;
    token?: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends TAuthUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    accessToken?: string;
    email?: string;
    name?: string;
    users?: TAccount;
    token?: string;
  }
}
