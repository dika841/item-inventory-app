"use client";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useCreateCategory } from "../_hooks/create-category.hook";
import { TCategoryRequest } from "@/api/categories/type";

export const CreateCategories = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useCreateCategory();
  const onFinish = async (values: TCategoryRequest) => {
    try {
      mutate(values, {
        onSuccess: () => {
          message.success("Category created successfully!");
          form.resetFields();
          router.push("/categories");
        },
      });
    } catch (error) {
      throw new Error("Failed to create category");
      console.log(error);
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add New Category
      </h2>
      <Form form={form} name="categories" onFinish={onFinish} layout="vertical">
        {" "}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the Category!" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <div className="space-x-8">
            <Button type="primary" htmlType="submit" style={{ width: "150px" }}>
              Submit
            </Button>
            <Button
              type="default"
              onClick={() => router.back()}
              htmlType="button"
              style={{ width: "150px" }}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
