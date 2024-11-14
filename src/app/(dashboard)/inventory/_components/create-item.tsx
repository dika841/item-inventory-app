"use client";

import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { FC } from "react";
import { useGetCategoryData } from "../_hooks/get-category-data";
import { useCreateInventory } from "../_hooks/post-inventory-data";
import { useRouter } from "next/navigation";
import { TInventoryRequest } from "@/api/inventory/post-inventory-data/type";

const { Option } = Select;

export const CreateItemForm: FC = () => {
  const { mutate } = useCreateInventory();
  const [form] = Form.useForm();
  const { data: categories } = useGetCategoryData();
  const router = useRouter();
  console.log(categories);
  const onFinish = async (values: TInventoryRequest) => {
    try {
      mutate(values, {
        onSuccess: () => {
          message.success("Item added successfully!");
          form.resetFields();
          router.push("/inventory");
        },
      });
    } catch (error) {
      message.error("Failed to submit the form.");
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      name="inventoryForm"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        name: "",
        quantity: 1,
        price: 0,
        category: "",
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input placeholder="Enter item name" />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please input the quantity!" }]}
      >
        <InputNumber min={1} placeholder="Enter quantity" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <InputNumber min={0} placeholder="Enter price" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select a category">
          {categories?.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
