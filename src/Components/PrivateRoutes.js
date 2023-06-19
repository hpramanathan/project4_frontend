import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
  const token = localStorage.getItem('token');
  console.log(token);

  let auth = { 'token': token ? true : false };
  return auth.token ? <Outlet /> : <Navigate to="/api/v1/login" />;
}

export default PrivateRoutes;
