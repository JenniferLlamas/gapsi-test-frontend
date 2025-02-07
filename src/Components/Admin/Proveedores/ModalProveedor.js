import React, { Component } from "react";
import { Row, Col, Modal, Form, Input, App, Spin } from "antd";
import axios from "axios";
import { getResponseError } from "../../Utils";

/**
 * @class FormProveedor
 * @description Formulario para el CRUD de Proveedores
 */
class FormProveedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.proveedor_id) this.get();
  }

  formRef = React.createRef();

  /**
   * @method get
   * @description Obtiene un proveedor de la bd
   */
  get = () => {
    this.setState({ loading: true });

    axios
      .get("/proveedores/" + this.props.proveedor_id)
      .then(({ data }) => {
        console.log("data", data);
        this.formRef.current.setFieldsValue({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.message.error(getResponseError(error.response,"Error al obtener el proveedor"));
      })
      .finally(() => this.setState({ loading: false }));
  };

  /**
   * @method add
   * @description Añade un nuevo registro de proveedor
   */
  add = (values) => {
    this.setState({ loading: true });
    axios
      .post("/proveedores", values)
      .then((response) => {
        this.props.message.success("¡Proveedor Creado!");
        this.props.onClose();
      })
      .catch((error) => {
        console.log("error", error);
        this.props.message.error(
          getResponseError(error.response, "Error al crear el proveedor")
        );
      })
      .finally(() => this.setState({ loading: false }));
  };

  /**
   * @method update
   * @description Actualiza un proveedor
   */
  update = (values) => {
    this.setState({ loading: true });
    axios
      .put("/proveedores", { id: this.props.proveedor_id, ...values })
      .then((response) => {
        this.props.message.open({
          type: "success",
          content: "¡Proveedor Actualizado!",
        });
        this.props.onClose();
      })
      .catch((error) => {
        console.log("error", error);
        this.props.message.error(
          getResponseError(error.response, "Error al actualizar el Proveedor")
        );
      })
      .finally(() => this.setState({ loading: false }));
  };

  /**
   * @method onFinish
   * @description Se ejecuta al hacer submit al formulario
   */
  onFinish = (values) => {
    if (this.props.proveedor_id) {
      this.update(values);
    } else {
      this.add(values);
    }
  };

  
  
  
  render() {

    return (
      <Spin spinning={this.state.loading}>
        <Form
          id="form-proveedor"
          layout={"vertical"}
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Row justify="center" align="middle" gutter={8}>
            <Col span={12}>
              <Form.Item
                name="nombre"
                label="Nombre"
                rules={[
                  {
                    required: true,
                    message: "Ingrese el nombre",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="razon_social"
                label="Razón Social"
                rules={[
                  {
                    required: true,
                    message: "Ingrese la Razón Social",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="direccion"
                label="Dirección"
                rules={[
                  {
                    required: true,
                    message: "Ingrese la dirección",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

export default function ModalProveedor(props) {
  const { open = false, onClose = () => {}, proveedor_id } = props;
  const { message } = App.useApp();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={proveedor_id ? "Editar Proveedor" : "Crear Proveedor"}
      closable={true}
      destroyOnClose={true}
      zIndex={1000}
      cancelText="Cancelar"
      okText="Guardar"
      okButtonProps={{
        form: "form-proveedor",
        key: "submit",
        htmlType: "submit",
      }}
    >
      <FormProveedor {...props} message={message}/>
    </Modal>
  );
}
