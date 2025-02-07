import React, { useContext } from "react";
import { Layout, Avatar, message, Flex, Button, Typography, Spin } from "antd";

import useSearch from "../Hooks/useSearch";
import { AntDesignOutlined } from "@ant-design/icons";
import PageHeader from "./Widgets/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";
import User from "Hooks/Logged";
const { Content, Footer } = Layout;
const { Title, Text } = Typography;
/**
 *
 * @export
 * @function Landing
 * @description Pagina principal a renderizar
 */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      redirect: false,
    };
  }

  redirect = () => {
    this.setState({ redirect: true });
    this.props.navigate("/admin/proveedores");
  };
  render() {
    return (
      <Layout>
        <PageHeader
          Icon={<img src="/logoBlanco.png" width={80}></img>}
          breadcrumb={{
            items: [
              {
                key: "0",
                title: "e-Commerce Gapsi",
                onClick: () => this.props.navigate("/"),
                className: "white-text header-text",
              },
            ],
          }}
        ></PageHeader>
        <Content className="full-content">
          <Flex
            gap="middle"
            align="center"
            justify="center"
            vertical
            flex={1}
            className="full-content"
          >
            <Avatar
              size={{
                xs: 100,
                sm: 140,
                md: 180,
                lg: 200,
                xl: 220,
                xxl: 250,
              }}
              icon={<AntDesignOutlined />}
            />
            <Title level={3}>
              {this.props.user?.usuario?.nombre ?? "Candidato no esta definido"}
            </Title>
            <Button
              type="primary"
              size="large"
              loading={this.state.redirect || this.state.loading}
              onClick={this.redirect}
            >
              Continuar
            </Button>
          </Flex>
        </Content>
        <Footer>
          {this.state.loading ? (
            <Spin className="flex-end" spinning={this.state.loading} />
          ) : (
            <Text className="white-text flex-end">
              {this.props.user.version ?? "Version no establecida"}
            </Text>
          )}
        </Footer>
      </Layout>
    );
  }
}

export default function View(props) {
  const { setShow } = useSearch();
  const user = useContext(User);


  return (
    <Landing {...props} setShowSearch={setShow} navigate={useNavigate()} user={user}/>
  );
}
