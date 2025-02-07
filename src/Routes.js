import React from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";

import RouterPublic from './Routes/PublicRoutes';
import RouterAdmin from './Routes/AdminRoutes';	
/**
 * 
 * @export
 * @function Routes
 * @description Ruteador principal de la app 
 */

 export default function() {
  return (
    <Routes>
      <Route path="/*" element={<RouterPublic />} />
      <Route path="/admin/*" element={<RouterAdmin />} />
    </Routes>
  )
}