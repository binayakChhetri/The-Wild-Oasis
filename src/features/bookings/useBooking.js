import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  // console.log(bookingId);
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    // React query will try to fetch the data 3times if it fails at first.
    // To prevent it we set retry to false
    //  if retry = 8, it will keep trying fetching the data till 8 times until it gets.
    retry: false,
  });

  return { isLoading, booking, error };
}
