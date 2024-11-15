"use client";

import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  message,
  Row,
  Col,
} from "antd";
import { FC, useState } from "react";
import { useGetCategoryData } from "../_hooks/get-category-data";
import { useCreateInventory } from "../_hooks/post-inventory-data";
import { useRouter } from "next/navigation";
import { TInventoryRequest } from "@/api/inventory/post-inventory-data/type";
import { useGetCurrencyData } from "../_hooks/get-currency-data";
import { TCurrencyResponse } from "@/api/get-currency-data/type";

const { Option } = Select;

export const CreateItemForm: FC = () => {
  const { mutate } = useCreateInventory();
  const [form] = Form.useForm();
  const { data: categories } = useGetCategoryData();
  const { data: currencies } = useGetCurrencyData();
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState<number>(1);

  const onValuesChange = (
    changedValues: { currencyId: number; purchasePrice: number },
    allValues: { purchasePrice: number }
  ) => {
    if (changedValues.currencyId && currencies) {
      const selected = currencies.find(
        (c) => Number(c.id) === changedValues.currencyId
      );
      if (selected) {
        setSelectedCurrency(selected.exchangeRate);
        const convertedPrice = Math.round(
          allValues.purchasePrice * selected.exchangeRate
        );
        form.setFieldsValue({
          sellingPrice: Math.round(convertedPrice * 1.2),
        });
      }
    }

    if (changedValues.purchasePrice && selectedCurrency) {
      const convertedPrice = Math.round(
        changedValues.purchasePrice * selectedCurrency
      );
      form.setFieldsValue({
        sellingPrice: Math.round(convertedPrice * 1.2),
      });
    }
  };

  const onFinish = async (values: TInventoryRequest) => {
    try {
      mutate(values, {
        onSuccess: () => {
          message.success("Item added successfully!");
          form.resetFields();
          router.push("/");
        },
      });
    } catch (error) {
      message.error("Failed to submit the form.");
      console.error(error);
    }
  };

  return (
    <div className="create-item-form">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add New Inventory Item
      </h2>
      <Form
        form={form}
        name="inventoryForm"
        layout="vertical"
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        initialValues={{
          name: "",
          quantity: 1,
          purchasePrice: 0,
          sellingPrice: 0,
          categoryId: "",
          currencyId:
            currencies?.find((c: TCurrencyResponse) => c.isDefault)?.id || null,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input placeholder="Enter item name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input the quantity!" },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                placeholder="Enter quantity"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Purchase Price"
              name="purchasePrice"
              rules={[
                { required: true, message: "Please input the purchase price!" },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Enter purchase price"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Currency"
              name="currencyId"
              rules={[{ required: true, message: "Please select a currency!" }]}
            >
              <Select placeholder="Select currency">
                {currencies?.map((currency: TCurrencyResponse) => (
                  <Option key={currency.id} value={currency.id}>
                    {currency.name} ({currency.code})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Selling Price (IDR)"
              name="sellingPrice"
              rules={[
                { required: true, message: "Selling price is required!" },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Calculated selling price"
              />
            </Form.Item>
          </Col>
        </Row>

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
