"use client";
import { TCurrencyResponse } from "@/api/currencies/type";
import { Button, message, Space, Table, TableProps } from "antd";
import { FC, ReactElement } from "react";
import { useGetCurrencyData } from "../_hooks/get-currency.hook";
import { useDeleteCurrency } from "../_hooks/delete-currency.hook";

export const CurrenciesPage: FC = (): ReactElement => {
  const { data, refetch } = useGetCurrencyData();
  const { mutate } = useDeleteCurrency();
  console.log(data);
  const columns: TableProps<TCurrencyResponse>["columns"] = [
    {
      title: "No",
      key: "no",
      dataIndex: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Exhange Rate",
      dataIndex: "exchangeRate",
      key: "exchangeRate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            href={`/dashboard/currencies/${record.id}/update`}
            variant="filled"
            color="primary"
          >
            Edit
          </Button>
          <Button
            variant="filled"
            color="danger"
            onClick={() =>
              mutate(record.id, {
                onSuccess: () => {
                  message.success("Item deleted successfully!");
                  refetch();
                },
              })
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <section className="space-y-4">
      <Button href="/dashboard/currencies/create">+ Add Item</Button>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </section>
  );
};
