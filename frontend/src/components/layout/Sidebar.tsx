import { NavLink } from "react-router-dom";

import { getNavigation } from "../../config/navigation";

import { UserRole } from "../../types/common.types";

interface SidebarProps {
  role: UserRole;
}

export default function Sidebar({
  role,
}: SidebarProps) {
  const navigation = getNavigation(role);

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">
          Stock Manager
        </h1>
      </div>

      <nav className="flex-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition

                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <Icon className="h-5 w-5" />

              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}