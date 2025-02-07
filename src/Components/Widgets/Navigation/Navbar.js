import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Input } from "antd";

const { Header } = Layout;
const { Search } = Input;

let myRef = React.createRef();
/**
 * @const Navbar
 * @description Header del sistema administrativo
 */
const Navbar = (props) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch("");
  }, [props.clear]);

  return (
    <Header>
      <Row className="width-100 " justify="start" align={"middle"}>
        <Col span={4} md={{ span: 12 }}>
          <img src={"/logo.png"} alt="logo" className="logo" />
        </Col>
        <Col span={20} md={{ span: 12 }}>
          {props.showSearch ? (
            <Search
              placeholder="Buscar"
              onSearch={(e) => {
                props.onSearch(e);
              }}
              className="search-input"
              enterButton
              allowClear
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              ref={myRef}
            />
          ) : null}
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
