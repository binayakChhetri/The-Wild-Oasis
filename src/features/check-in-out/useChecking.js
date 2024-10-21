import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),

    // This onSuccess does actually receives some data.
    // This data is exactly the data that is returned from the function mutation funtion i.e "updateBooking"
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      //   This will invalidate all the queries that are currently active on the page
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in."),
  });
  return { checkin, isCheckingIn };
}
