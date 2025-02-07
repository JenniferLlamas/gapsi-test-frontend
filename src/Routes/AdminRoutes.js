import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout, Typography } from "antd";
import RouteProveedores from "./Admin/RouterProveedores";

import { Search } from "../Hooks/useSearch";
import Navbar from "../Components/Widgets/Navigation/Navbar";
import Sidebar from "../Components/Widgets/Navigation/Sidebar";
const { Content, Footer } = Layout;
const { Text } = Typography;
/**
 *
 * @export
 * @function AdminRoutes
 * @description Router para las rutas publicas o de libre acceso
 */
class AdminRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      showSearch: true,
      collapsed: false,
    };
  }

  setSearch = (search) => this.setState({ search });
  setShowSearch = (showSearch) => this.setState({ showSearch });
  setCollapsed = (collapsed) => this.setState({ collapsed });

  render() {
    return (
      <Search.Provider
        value={{
          search: this.state.search,
          setSearch: this.setSearch,
          show: this.state.showSearch,
          setShow: this.setShowSearch,
        }}
      >
        <Layout>
          <Navbar showSearch={false} />
          <Layout>
            <Sidebar></Sidebar>
            <Content>
              <Routes>
                <Route
                  path="/proveedores/*"
                  element={<RouteProveedores search={this.state.search} />}
                />
              </Routes>
              <Footer>
                <Text className="white-text flex-end">
                  Development by Jennifer Llamas
                </Text>
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </Search.Provider>
    );
  }
}

export default function (props) {
  return <AdminRoutes {...props} navigate={useNavigate()} />;
}
