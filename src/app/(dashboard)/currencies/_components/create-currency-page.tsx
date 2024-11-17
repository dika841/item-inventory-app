"use client";
import { Button, Col, Form, Input, InputNumber, message, Row } from "antd";
import { useRouter } from "next/navigation";
import { FC, ReactElement } from "react";
import { useCreateCurrency } from "../_hooks/create-currency.hook";
import { TCurrencyRequest } from "@/api/currencies/type";

export const CreateCurrencyPage: FC = (): ReactElement => {
  const router = useRouter();
  const { mutate } = useCreateCurrency();
  const [form] = Form.useForm();
  const onFinish = async (values: TCurrencyRequest) => {
    try {
      mutate(values, {
        onSuccess: () => {
          message.success("Currency created successfully!");
          form.resetFields();
          router.push("/currencies");
        },
      });
    } catch (error) {
      throw new Error("Failed to create currency");
      console.log(error);
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add New Currency
      </h2>
      <Form form={form} name="currency" onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input the Currency!" },
              ]}
            >
              <Input placeholder="Enter currency name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Symbol *(Rp, $, etc.)"
              name="symbol"
              rules={[{ required: true, message: "Please input the Symbol!" }]}
            >
              <Input placeholder="Enter symbol" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Code *(IDR, etc)"
              name="code"
              rules={[{ required: true, message: "Please input the Code!" }]}
            >
              <Input placeholder="Enter Code currency" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Exchange Rate"
              name="exchangeRate"
              rules={[
                { required: true, message: "Please input the Exchange Rate!" },
              ]}
            >
              <InputNumber
                placeholder="Enter currency Exchange Rate"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
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
