import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  console.log(filterValue);
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          // method: "gte" /* gte => greater than or equal to */,
        };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  console.log(field, direction);
  const sortBy = { field, direction };
  console.log(sortBy);

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: [
      "bookings",
      filter,
      sortBy,
    ] /*["bookings", filter, sortBy] => These are the dependency array of the useQuery i.e if their value changes, react query will re-fetch the data. Just like useEffect hook */,

    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, bookings, error };
}
