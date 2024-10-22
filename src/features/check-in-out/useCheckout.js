import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    // This onSuccess does actually receives some data.
    // This data is exactly the data that is returned from the function mutation funtion i.e "updateBooking"
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      //   This will invalidate all the queries that are currently active on the page
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error while checking out."),
  });
  return { checkout, isCheckingOut };
}
