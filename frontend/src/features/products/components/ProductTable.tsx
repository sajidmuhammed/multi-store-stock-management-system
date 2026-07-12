import Button from "../../../components/ui/Button";
import DataTable, {
  type Column,
} from "../../../components/shared/DataTable";

import { useAuth } from "../../auth/hooks/useAuth";

import { UserRole } from "../../../types/common.types";

import type { Product } from "../types/product.types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export default function ProductTable({
  products,
  onEdit,
}: ProductTableProps) {
  const { user } = useAuth();

  const columns: Column<Product>[] = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "SKU",
      accessor: "sku",
    },
    {
      header: "Created",
      accessor: "createdAt",
      render: (product) =>
        new Date(
          product.createdAt
        ).toLocaleDateString(),
    },
  ];

  if (user?.role === UserRole.ADMIN) {
    columns.push({
      header: "Actions",
      accessor: "actions",
      render: (product) => (
        <Button
          size="sm"
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>
      ),
    });
  }

  return (
    <DataTable
      columns={columns}
      data={products}
    />
  );
}