import React, { Component } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserAddOutlined,
  SwapLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  /**
   *
   *
   * @memberof AdminSidebar
   */
  toogle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsedWidth={80}
        breakpoint="md"
        onBreakpoint={this.toogle}
        collapsed={this.state.collapsed}
      >
        <Button
          type="text"
          icon={this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => this.toogle()}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserAddOutlined />,
              label: "Proveedores",
            },
            {
              key: "2",
              label: "Salir",
              icon: <SwapLeftOutlined />,
              onClick: () => this.props.navigate("/"),
            },
          ]}
        ></Menu>
      </Sider>
    );
  }
}
export default function View(props) {
  return <Sidebar {...props} navigate={useNavigate()} />;
}
