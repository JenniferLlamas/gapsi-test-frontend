import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Landing from "../Components/Landing";
/**
 *
 * @export
 * @function PublicRoutes
 * @description Router para las rutas publicas o de libre acceso
 */
class PublicRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Routes>
          <Route path="" element={<Landing  />} />
        </Routes>
      </Layout>
    );
  }
}
export default function View(props) {
  return <PublicRoutes {...props} />;
}
