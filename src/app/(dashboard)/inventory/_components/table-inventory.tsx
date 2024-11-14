"use client";

import { Button, message, Space, Table, TableProps } from "antd";
import { FC, ReactElement } from "react";
import { useGetInventoryData } from "../_hooks/get-inventory-data";
import { useRouter } from "next/navigation";
import { TInventoryResponse } from "@/api/inventory/get-inventory-data/type";
import { useDeleteInventoryData } from "../_hooks/delete-inventory";

export const TableInventory: FC = (): ReactElement => {
  const router = useRouter();
  const { mutate } = useDeleteInventoryData();
  const { data, refetch } = useGetInventoryData();
  console.log(data);
  const columns: TableProps<TInventoryResponse>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category.name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button href={`/inventory/${record.id}/update`} type="link">
            Edit
          </Button>
          <Button
            type="link"
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
    <div className="space-y-4">
      <Button onClick={() => router.push("/inventory/create")}>
        + Add Item
      </Button>
      <Table
        dataSource={data as unknown as TInventoryResponse[]}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};
