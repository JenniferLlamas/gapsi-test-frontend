import React from "react";
import {
  Layout,
  Col,
  Row,
  Typography,
  List,
  message,
  FloatButton,
  Empty,
  Space,
  App 
} from "antd";

import useSearch from "../../../Hooks/useSearch";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../Widgets/PageHeader/PageHeader";
import { ButtonDelete, ButtonEdit } from "../../Widgets/Buttons";

import axios from "axios";

import { PlusOutlined } from "@ant-design/icons";
import ModalProveedor from "./ModalProveedor";
import { getResponseError } from "../../Utils";

const { Content } = Layout;
const { Text } = Typography;
/**
 *
 * @export
 * @function Proveedores
 * @description Modulo de prooveedores
 */
class Proveedores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      proveedores: {
        data: [],
        page: 1,
        total: 0,
        limit: 10,
      },
    };
  }

  componentDidMount() {
    this.props.setShowSearch(true);
    this.getProveedores();
  }

  componentDidUpdate(prevProps) {
    if (this.props.search != prevProps.search) {
      this.getProveedores();
    }
  }

  getProveedores = (
    {
      page = this.state.proveedores.page,
      limit = this.state.proveedores.limit,
      search = this.props.search,
    } = this.state.proveedores
  ) => {
    this.setState({ loading: true });

    axios
      .get("/proveedores", {
        params: {
          page,
          limit,
          search,
        },
      })
      .then(({ data }) => {
        console.log("proveedor", data);
        this.setState({ proveedores: { ...data } });
      })
      .catch((error) => {
        console.log("proveedor error", error);
        this.props.message.error(getResponseError(error.response,"Error al obtener los proveedores"));
      })
      .finally(() => this.setState({ loading: false }));
  };

  onScroll = () => {
    this.getProveedores();
  };

  openModal = (proveedor_id) => {
    this.setState({ modal_open: true, proveedor_id });
  };

 
  render() {
    return (
      <>
        <PageHeader
          title="Proveedores"
          breadcrumb={{
            items: [
              {
                title: "Lista",
              },
            ],
          }}
        />
        <Content className="full-content pd-1">
          <List
            loading={this.state.loading}
            locale={{ emptyText: <Empty description="No hay proveedores" /> }}
            className="pd-1"
            dataSource={this.state.proveedores?.data}
            pagination={{
              current: this.state.proveedores.page,
              pageSize: this.state.proveedores.limit,
              total: this.state.proveedores.total,
              hideOnSinglePage: false,
              position: "bottom",
              onChange: (page, limit) => this.getProveedores({ page, limit }),
            }}
            header={
              <Row
                align="middle"
                justify="space-between"
                gutter={[24, 24]}
                wrap
                className="width-100 pl-1 pr-1"
              >
                <Col span={6}>
                  <Text strong>Nombre</Text>
                </Col>
                <Col span={5}>
                  <Text strong>Razón Social</Text>
                </Col>
                <Col span={8}>
                  <Text strong>Dirección</Text>
                </Col>

                <Col span={2}></Col>
              </Row>
            }
            renderItem={(item) => (
              <List.Item className="list-item">
                <Row
                  gutter={[24, 24]}
                  align="middle"
                  justify="space-between"
                  className="width-100 pl-1 pr-1"
                >
                  <Col span={6}>
                    <Text
                      ellipsis={{
                        rows: 1,
                      }}
                    >
                      {item.nombre}
                    </Text>
                  </Col>
                  <Col span={5}>
                    <Text>{item.razon_social}</Text>
                  </Col>
                  <Col span={8}>
                    <Text
                      ellipsis={{
                        rows: 1,
                      }}
                    >
                      {item.direccion}
                    </Text>
                  </Col>
                  <Col span={2}>
                    <Space wrap align="end">
                      <ButtonEdit
                        onClick={() =>
                          this.setState({
                            modal_open: true,
                            proveedor_id: item._id,
                          })
                        }
                      />
                      <ButtonDelete
                        type="primary"
                        onConfirm={() =>
                          axios
                            .delete("/proveedores/", {
                              params: { id: item._id },
                            })
                            .then((response) => {
                              this.props.message.success("¡Proveedor eliminado!");
                              this.getProveedores();
                            })
                            .catch((error) => {
                              this.props.message.error(
                                getResponseError(
                                  error.response,
                                  "Error al eliminar el proveedor"
                                )
                              );
                              this.getProveedores();
                            })
                        }
                      />
                    </Space>
                  </Col>
                </Row>
              </List.Item>
            )}
          ></List>
          <FloatButton
            onClick={() => this.openModal(null)}
            icon={<PlusOutlined />}
            tooltip={<div>Agregar Proveedor</div>}
          />
          <ModalProveedor
            open={this.state.modal_open}
            onClose={() => {
              this.setState({ modal_open: false, proveedor_id: undefined });
              this.getProveedores();
            }}
            proveedor_id={this.state.proveedor_id}
          />
        </Content>
      </>
    );
  }
}

export default function View(props) {
  const { setShow } = useSearch();
  const { message } = App.useApp();
  return (
    <Proveedores {...props} setShowSearch={setShow} navigate={useNavigate()}  message={message}/>
  );
}
