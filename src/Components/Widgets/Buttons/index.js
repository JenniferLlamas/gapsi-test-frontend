import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";

const ButtonDelete = (props) => {
  let {
    type = "secondary",
    icon = <DeleteOutlined />,
    onConfirm = () => {},
    className = "",
    disabled = false,
    size = "middle",
  } = props;

  return (
    <Popconfirm
      placement="topRight"
      title="¿Deseas eliminar este registro?"
      onConfirm={onConfirm}
      okText="Sí"
      cancelText="No"
    >
      <Button
        {...props}
        type={type}
        className={className}
        icon={icon}
        danger
        size={size}
        variant="outlined"
        disabled={disabled}
      />
    </Popconfirm>
  );
};

const ButtonView = (props) => {
  let {
    type = "default",
    icon = <EyeOutlined />,
    onClick = () => {},
    className = "",
    size = "middle",
  } = props;

  return (
    <Button
      {...props}
      type={type}
      className={className}
      icon={icon}
      onClick={onClick}
      size={size}
    />
  );
};

const ButtonEdit = (props) => {
  let {
    type = "primary",
    icon = <EditOutlined />,
    onClick = () => {},
    className = "",
    size = "middle",
  } = props;

  return (
    <Button
      {...props}
      type={type}
      className={className}
      icon={icon}
      size={size}
      onClick={onClick}
    />
  );
};

export { ButtonDelete, ButtonView, ButtonEdit };
