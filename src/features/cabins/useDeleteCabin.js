/* eslint-disable */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  // By using "useQueryClient" hook we can access the queryClient instance
  const queryClient = useQueryClient();

  // This is used for mutating the values of the remote state (database datas)
  const {
    isLoading: isDeleting,
    mutate:
      deleteCabin /*  mutate is just a callback function that we can connect with the button */,
  } = useMutation({
    mutationFn: deleteCabinApi /* or (cabinId) => deleteCabin(cabinId) */,
    /* This is the function that react query will call */ // This will tell react query what to do as soon as mutation was successful
    // Here, we will invalid the cache to re-fetch the data
    onSuccess: () => {
      queryClient.invalidateQueries({
        // This data with "cabins" as queryKey will be invalidate
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
