import React from "react";
import { useAxiosInterceptors } from "./hooks/useAxiosInterceptors";
import { Outlet } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AppProvider from "./providers/app";

const RootComponent = () => {
  useAxiosInterceptors();

  return (
    <AppProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </AppProvider>
  );
};

export default RootComponent;
