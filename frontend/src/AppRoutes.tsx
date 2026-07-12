import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";

import ProductsPage from "./features/products/pages/ProductsPage";
import StoresPage from "./features/stores/pages/StoresPage";
import InventoryPage from "./features/inventory/pages/InventoryPage";

import { UserRole } from "./types/common.types";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* Protected */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/inventory"
            element={<InventoryPage />}
          />

          {/* Admin */}

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[UserRole.ADMIN]}
              />
            }
          >
            <Route
              path="/stores"
              element={<StoresPage />}
            />
          </Route>
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/products"
            replace
          />
        }
      />
    </Routes>
  );
}