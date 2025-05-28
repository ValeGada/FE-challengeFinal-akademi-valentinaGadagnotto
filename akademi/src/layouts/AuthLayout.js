import React from "react";
import { Outlet } from "react-router-dom";
import { AuthWrapper, AuthCard } from '../styles';

const AuthLayout = () => {
  return (
    <AuthWrapper>
      <AuthCard>
        <Outlet />
      </AuthCard>
    </AuthWrapper>
  );
};

export default AuthLayout;
