"use client";
import React, { PropsWithChildren } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { DatabaseOutlined, TransactionOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const items = [
    {
      key: "/",
      icon: <DatabaseOutlined />,
      label: "Inventory",
    },
    {
      key: "/inventory",
      icon: <TransactionOutlined />,
      label: "Transactions",
      children: [
        {
          key: "/inventory/items-in",
          label: "Items IN",
        },
        {
          key: "/inventory/items-out",
          label: "Items OUT",
        },
      ],
    },
  ];
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const onClick = (e: { key: string }) => {
    router.push(e.key);
  };
  return (
    <Layout className="h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo h-8 m-4 text-white text-center">Inventify</div>
        <Menu
          items={items}
          onClick={onClick}
          theme="dark"
          defaultSelectedKeys={["/"]}
          selectedKeys={[pathname]}
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
