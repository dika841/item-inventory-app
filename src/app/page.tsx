import { NextPage } from "next";
import { ReactElement } from "react";
import DashboardLayout from "./_components/dashboard-layout";

const Page: NextPage = (): ReactElement => {
  return (
    <DashboardLayout>
      <h1>Welcome to the Dashboard</h1>
    </DashboardLayout>
  );
};
export default Page;
