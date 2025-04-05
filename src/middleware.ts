import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("Middleware Token:", token);
      if (token) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/login",
  },
});
export const config = {
  matcher: [
    "/dashboard/",
    "/inventory/:path*",
    "/categories/:path*",
    "/currencies/:path*",
  ],
};
