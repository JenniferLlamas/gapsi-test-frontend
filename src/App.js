import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Routes from "./Routes";
import {  App as AntdApp } from "antd";

import { User, SetUser } from "./Hooks/Logged";

import "./Components/Styles/Global.scss";


/**Configuracion de axios con el servidor */
axios.defaults.baseURL = process.env.REACT_APP_WEB_SERVICE;
axios.defaults.headers.common["Content-Type"] = "application/json";




/**
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
   this.getUsuario();
  }

  getUsuario = () => {
    axios
      .get("/usuario/logged")
      .then(({ data }) => {
        this.setUser(data.user_json);
      })
      .catch((error) => {
        this.props.message.error('No se pudo obtener el usuario');
      });
  };

  setUser = (user) => this.setState({ user })

  render() {

    const { setUser } = this;
    const { user } = this.state;
    return (
      
        <User.Provider value={user}>
          <SetUser.Provider value={setUser}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </SetUser.Provider>
        </User.Provider>
    );
  }
}

export default function View(props) {

  const { message } = AntdApp.useApp();
  return <App {...props}  message={message}/>;
}
