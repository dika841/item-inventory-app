"use client";
import { Button, Form, Input, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TCategoryRequest } from "@/api/categories/type";
import { useGetOneCategoryData } from "../../_hooks/get-one-category.hook";
import { useUpdateCategory } from "../_hooks/update-category.hook";

export const UpdateCategory = () => {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const { mutate } = useUpdateCategory();
  const { data } = useGetOneCategoryData(params.id as string);
  const onFinish = async (values: TCategoryRequest) => {
    try {
      mutate(
        { id: params.id as string, payload: values },
        {
          onSuccess: () => {
            message.success("Category update successfully!");
            form.resetFields();
            router.push("/dashboard/categories");
          },
        }
      );
    } catch (error) {
      throw new Error("Failed to create category");
      console.log(error);
    }
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
      });
    }
  }, [data, form]);
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Update Category
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
