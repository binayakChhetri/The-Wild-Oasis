import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],

    // getCabins will return promises
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
