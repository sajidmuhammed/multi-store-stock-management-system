import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T extends object>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.accessor)}
                  className="px-4 py-3 text-left text-sm font-semibold"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="border-t"
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.accessor)}
                      className="px-4 py-3"
                    >
                      {column.render
                        ? column.render(row)
                        : String(
                            row[
                              column.accessor as keyof T
                            ]
                          )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}