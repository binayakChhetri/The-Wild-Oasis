import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  // By using "useQueryClient" hook we can access the queryClient instance
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // This data with "bookings" as queryKey will be invalidate
        queryKey: ["bookings"],
      });
      toast.success("Booking successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
