import DataTable from "../../../components/shared/DataTable";

import type { InventoryItem } from "../types/inventory.types";

interface InventoryTableProps {
  inventory: InventoryItem[];
}

export default function InventoryTable({
  inventory,
}: InventoryTableProps) {
  return (
    <DataTable
      columns={[
        {
          header: "Product",
          accessor: "product",
          render: (row) => row.product.name,
        },
        {
          header: "SKU",
          accessor: "product",
          render: (row) => row.product.sku,
        },
        {
          header: "Store",
          accessor: "store",
          render: (row) => row.store.name,
        },
        {
          header: "Quantity",
          accessor: "quantity",
        },
      ]}
      data={inventory}
    />
  );
}