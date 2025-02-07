import React from 'react'
import { Route, Routes } from "react-router-dom";

import Proveedores from '../../Components/Admin/Proveedores/Proveedores';

/**
 * 
 * @export
 * @function RouteProveedores
 * @description Router for Eventos routes 
 */
function RouteProveedores(props) {
  return (
    <Routes>
      <Route path="" element={<Proveedores {...props} />} />
    </Routes>
  )
}

export default RouteProveedores