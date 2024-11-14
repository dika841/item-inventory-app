"use client";
import React, { PropsWithChildren } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { FileOutlined } from "@ant-design/icons";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = React.useState(false);
  const items = [
    {
      key: "sub2",
      icon: <FileOutlined />,
      label: "Inventory",
      children: [
        {
          key: "1",
          label: "Barang Masuk",
        },
        {
          key: "2",
          label: "Barang Keluar",
        },
      ],
    },
  ];
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo h-8 m-4 text-white text-center">Inventify</div>
        <Menu
          items={items}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: "#fff" }}
        />
        <Content className="mx-4 my-0">
          <Breadcrumb
            items={[{ title: "Dashboard" }, { title: "Inventory" }]}
          />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer className="text-center">
          Inventify ©2024 Created by Randika
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
