import { GridProps } from "@/types/common/grid";

function Grid<T extends { id: string }>({
  columns,
  data,
  sort,
  onSort,
  className = "",
}: GridProps<T>) {
  const colSpan = columns.length + 1;
  return (
    <div
      className={`overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <table className="w-full min-w-160 border-collapse text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th
              scope="col"
              className="w-12 px-4 py-3 text-start text-xs font-semibold text-slate-500"
            >
              ردیف
            </th>
            {columns.map((column) => {
              const isActive =
                !!column.sortKey && sort?.key === column.sortKey;
              const ariaSort =
                isActive && sort
                  ? sort.order === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined;

              return (
                <th
                  key={column.id}
                  scope="col"
                  aria-sort={ariaSort}
                  className={`px-4 py-3 text-start text-xs font-semibold text-slate-500 ${column.className ?? ""}`}
                >
                  {column.sortKey && onSort ? (
                    <button
                      type="button"
                      onClick={() => onSort(column.sortKey!)}
                      className="inline-flex items-center gap-1 rounded hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      {column.value}
                      <span aria-hidden="true">
                        {isActive && sort
                          ? sort.order === "asc" ? "▲" : "▼"
                          : "↕"}
                      </span>
                    </button>
                  ) : (
                    column.value
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          { !data || data.length == 0 ? (
            <tr className="text-center">
              <td colSpan={colSpan} className="px-4 py-4 text-center text-slate-500">
                داده یافت نشد.
              </td>
            </tr>
          ) : data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-4 py-3 text-slate-400">{index + 1}</td>
              {columns.map((column) => (
                <td key={column.id} className="px-4 py-3 text-slate-700">
                  {column.render
                    ? column.render(item)
                    : column.key
                      ? String(item[column.key] ?? "")
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grid;