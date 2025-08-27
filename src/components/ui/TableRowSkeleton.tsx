const TableRowSkeleton = ({ row, col = 5 }: { row?: number; col: number }) => {
  return (
    <>
      {Array.from({ length: row || 5 }).map((_, i) => (
        <tr className="animate-pulse border-b border-white/10" key={i + "row_skeleton"}>
          {Array.from({ length: col }).map((_, j) => (
            <td className="py-3 pr-6" key={`row_${i}_col_${j}_skeleton`}>
              <span className="flex h-4 w-24 rounded bg-white/20"></span>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableRowSkeleton;
