import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "With discount", value: "with-discount" },
        ]}
      />
      <SortBy
        sortField="sortBy"
        options={[
          { label: "Sort by name (A-Z)", value: "name-asc" },
          { label: "Sort by name (Z-A)", value: "name-desc" },
          { label: "Sort by price (low first)", value: "regular_price-asc" },
          { label: "Sort by price (high first)", value: "regular_price-desc" },
          { label: "Sort by capacity (low first)", value: "maxCapacity-asc" },
          { label: "Sort by capacity (high first)", value: "maxCapacity-desc" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
