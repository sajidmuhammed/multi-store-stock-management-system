import DataTable, {
  type Column,
} from "../../../components/shared/DataTable";

import type { Store } from "../types/store.types";

interface StoreTableProps {
  stores: Store[];
}

export default function StoreTable({
  stores,
}: StoreTableProps) {
  const columns: Column<Store>[] = [
    {
      header: "Store Name",
      accessor: "name",
    },
    {
      header: "Location",
      accessor: "location",
    },
    {
      header: "Created",
      accessor: "createdAt",
      render: (store) =>
        new Date(
          store.createdAt
        ).toLocaleDateString(),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={stores}
    />
  );
}