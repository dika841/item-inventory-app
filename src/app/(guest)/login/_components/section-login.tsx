"use client";
import { Col, Row, Typography } from "antd";
import { Image } from "antd";
import { FormLogin } from "./form-login";
export const LoginSection = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#f3f3f3",
      }}
    >
      <Row align={"middle"} justify={"center"}>
        <Col span={14}>
          <Image
            src={
              "https://images.unsplash.com/photo-1648824572347-517357c9c44e?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={"auto"}
            height={"auto"}
            alt="inventify-image"
            preview={false}
            style={{
              width: "100%",
              minHeight: "100vh",
              objectFit: "cover",
              objectPosition: "left",
              position: "relative",
              filter: "brightness(0.5)",
            }}
          />
        </Col>
        <Col span={10} style={{ overflow: "hidden" }}>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Login
          </Typography.Title>
          <FormLogin />
        </Col>
      </Row>
    </section>
  );
};
