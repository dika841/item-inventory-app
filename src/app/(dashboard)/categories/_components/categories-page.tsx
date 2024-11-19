"use client";
import { Button, message, Space, Table, TableProps } from "antd";
import { useGetCategoryData } from "../_hooks/get-category-data";
import { TCategoryResponse } from "@/api/categories/type";
import { useDeleteCategoryData } from "../_hooks/delete-category.hook";

export const CategoriesPage = () => {
  const { data: categories, refetch } = useGetCategoryData();
  const { mutate } = useDeleteCategoryData();
  const columns: TableProps<TCategoryResponse>["columns"] = [
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            variant="filled"
            color="primary"
            href={`/categories/${record.id}/update`}
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
      <Button href="/categories/create">+ Add Item</Button>
      <Table dataSource={categories} columns={columns} rowKey="id" />
    </section>
  );
};
