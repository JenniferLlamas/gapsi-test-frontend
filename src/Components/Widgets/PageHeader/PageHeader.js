import { Component } from "react";
import "./PageHeader.scss";
import { Breadcrumb, Col, Row, Space, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

/**
 *
 *
 * @export
 * @class PageHeader
 * @extends {Component}
 * @property {Component | boolean} backIcon - Icono de regreso, puedes custometizarlo pero tendras que manejar la accion.
 * @property {function} onBack - Función a ejecutar cuando sea presionado el backIcon
 * @property {string} title - Titulo del componente
 * @property {string} subtitle - Subtitulo del componente
 * @property {object} breadcrumbs - Props del componente Breadcrum de AntD v5.X
 * @property {Component} extra - Componente extra orientado a la derecha del componente
 * @property {string} className - Clases para personalizar el componente
 */
export default class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      backIcon,
      Icon,
      onBack = () => {},
      title,
      subTitle,
      breadcrumb = {},
      extra,
      className = "",
    } = this.props;

    return (
      <Row
        justify="space-between"
        wrap={true}
        align={"middle"}
        gutter={[24, 24]}
        className={"page-header " + className}
      >
        <Col flex="none" className="page-header-left">
          <Space size={12}>
            {Icon ? Icon : null}
            {backIcon === true ? (
              <ArrowLeftOutlined
                className="page-header-back-icon"
                onClick={onBack}
                style={{ cursor: "pointer" }}
              />
            ) : backIcon ? (
              backIcon
            ) : null}
            {title ? (
              <Title level={1} className="page-header-title">
                {title}
              </Title>
            ) : null}
            {subTitle ? (
              <Text level={2} className="page-header-subtitle">
                {subTitle}
              </Text>
            ) : null}
            {breadcrumb ? (
              <Breadcrumb className="page-header-breadcrumb" {...breadcrumb} />
            ) : null}
          </Space>
        </Col>
        <Col flex="none" className="page-header-right">
          <Space size={12}>{extra}</Space>
        </Col>
      </Row>
    );
  }
}
