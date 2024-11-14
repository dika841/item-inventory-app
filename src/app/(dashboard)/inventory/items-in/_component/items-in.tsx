"use client";
import { TransactionType } from "@prisma/client";
import { Space, Table, TableProps } from "antd";
import { FC, ReactElement } from "react";
interface DataType {
  key: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}
export const ItemsIn: FC = (): ReactElement => {
  const dataSource = [
    {
      key: "1",
      name: "Laptop",
      category: "Electronics",
      quantity: 12,
      price: 10000,
      transactionType: TransactionType.IN,
    },
    {
      key: "2",
      name: "Freezer",
      category: "Electronics",
      quantity: 10,
      price: 10000,
      transactionType: TransactionType.IN,
    },
  ];

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <section className="w-full">
      <h1>Items In</h1>
      <Table dataSource={dataSource} columns={columns} />
    </section>
  );
};
