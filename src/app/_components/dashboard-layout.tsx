"use client";
import React, { PropsWithChildren } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo h-8 m-4 text-white text-center">Inventify</div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Overview
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Analytics
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
            <Menu.Item key="3">Profile</Menu.Item>
            <Menu.Item key="4">Settings</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Teams">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Documents
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: "#fff" }}
        />
        <Content className="mx-4 my-0">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Overview</Breadcrumb.Item>
          </Breadcrumb>
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
