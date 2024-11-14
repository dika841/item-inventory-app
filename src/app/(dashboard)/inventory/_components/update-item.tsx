"use client";

import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { FC, useEffect } from "react";
import { useGetCategoryData } from "../_hooks/get-category-data";
import { useParams, useRouter } from "next/navigation";
import { TInventoryRequest } from "@/api/inventory/post-inventory-data/type";
import { useGetOneInventoryData } from "../_hooks/get-one-inventory-data";
import { useUpdateInventory } from "../_hooks/update-inventory-data";

const { Option } = Select;

export const UpdateItemForm: FC = () => {
  const params = useParams();
  const { data: itemData } = useGetOneInventoryData(params.id as string);
  const { mutate } = useUpdateInventory();
  const [form] = Form.useForm();
  const { data: categories } = useGetCategoryData();
  const router = useRouter();

  useEffect(() => {
    if (itemData) {
      form.setFieldsValue({
        name: itemData.name,
        quantity: itemData.quantity,
        price: itemData.price,
        categoryId: itemData.categoryId,
      });
    }
  }, [itemData, form]);

  const onFinish = async (values: TInventoryRequest) => {
    try {
      mutate(
        { id: params.id as string, payload: values },
        {
          onSuccess: () => {
            message.success("Item updated successfully!");
            router.push("/inventory");
          },
        }
      );
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
        categoryId: "",
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
