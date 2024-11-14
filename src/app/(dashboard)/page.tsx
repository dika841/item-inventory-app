import { NextPage } from "next";
import { ReactElement } from "react";
import { TableInventory } from "./inventory/_components/table-inventory";

const Page: NextPage = (): ReactElement => {
  return <TableInventory />;
};
export default Page;
