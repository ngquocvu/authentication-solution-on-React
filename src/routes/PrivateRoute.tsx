import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useRedux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.auth);
  return auth.current.isLogin ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
