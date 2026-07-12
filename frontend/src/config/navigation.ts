import {
  ArchiveBoxIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";

import { UserRole } from "../types/common.types";

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

export const adminNavigation: NavigationItem[] = [
  {
    name: "Products",
    path: "/products",
    icon: CubeIcon,
  },
  {
    name: "Stores",
    path: "/stores",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: ArchiveBoxIcon,
  },
  {
    name: "Transfers",
    path: "/inventory/transfers",
    icon: ArrowPathRoundedSquareIcon,
  },
];

export const shopperNavigation: NavigationItem[] = [
  {
    name: "Products",
    path: "/products",
    icon: CubeIcon,
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: ArchiveBoxIcon,
  },
];

export const getNavigation = (
  role: UserRole
) => {
  return role === UserRole.ADMIN
    ? adminNavigation
    : shopperNavigation;
};