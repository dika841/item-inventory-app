"use client";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { LoginSchema, TLoginForm } from "../_schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../_hooks/use-login-mutation";

export const FormLogin = () => {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(LoginSchema),
  });
  const loginMutaiton = useLoginMutation();
  const handleSubmit = (data: TLoginForm) => {
    loginMutaiton.mutate(data);
  };
  return (
    <Row justify={"center"}>
      <Form
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: "24rem", minWidth: "20rem" }}
        initialValues={{ remember: true }}
        onFinish={form.handleSubmit(handleSubmit)}
        autoComplete="off"
        layout="vertical"
      >
        <FormItem name="email" label="Email" control={form.control}>
          <Input placeholder="Email" />
        </FormItem>
        <FormItem name="password" label="Password" control={form.control}>
          <Input.Password placeholder="Password" />
        </FormItem>
        <Row gutter={16} justify={"space-between"}>
          <Col>
            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <Button type="link">Forgot Password</Button>
          </Col>
        </Row>
        <Form.Item label={null}>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loginMutaiton.isPending}
            disabled={loginMutaiton.isPending}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};
