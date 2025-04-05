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
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TCurrencyResponse } from "@/api/currencies/type";
import { TInventoryRequest } from "@/api/inventory/type";
import { useCreateInventory } from "../_hooks/create-inventory.hook";
import { useGetCategoryData } from "@/app/(authentication)/dashboard/categories/_hooks/get-category-data";
import { useGetCurrencyData } from "@/app/(authentication)/dashboard/currencies/_hooks/get-currency.hook";

export const CreateItemForm: FC = () => {
  const { Option } = Select;
  const { mutate } = useCreateInventory();
  const [form] = Form.useForm();
  const { data: categories } = useGetCategoryData();
  const { data: currencies } = useGetCurrencyData();
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState<number>(1);

  const onValuesChange = (
    changedValues: { currencyId: string; purchasePrice: number },
    allValues: { purchasePrice: number }
  ) => {
    if (changedValues.currencyId && currencies) {
      const selected = currencies.find(
        (c) => c.id === changedValues.currencyId
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

  useEffect(() => {
    if (currencies) {
      setSelectedCurrency(
        currencies.find((c) => c.isDefault)?.exchangeRate || 1
      );
    }
  }, [currencies]);
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
          category: null,
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
              label="Selling Price (IDR +20% Markup)"
              name="sellingPrice"
              rules={[
                { required: true, message: "Selling price is required!" },
              ]}
            >
              <InputNumber
                min={0}
                disabled
                style={{ width: "100%" }}
                placeholder="Calculated selling price"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
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
