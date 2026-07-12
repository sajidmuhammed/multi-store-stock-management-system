import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { useAuth } from "../../features/auth/hooks/useAuth";

export default function AppLayout() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={user.role} />

      <div className="flex flex-1 flex-col">
        <Navbar
          userName={user.name}
          role={user.role}
          onLogout={logout}
        />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

