import { Metadata } from "next";
import { FC, ReactNode } from "react";
import DashboardLayout from "../_components/dashboard-layout";
interface LayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
  title: "Inventify  | Dashboard",
  description: "Your Dashboard",
};
const Layout: FC<LayoutProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
export default Layout;
