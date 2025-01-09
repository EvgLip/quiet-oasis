import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router";

export default function useGetBooking ()
{
  const { bookingId } = useParams();

  const { isLoading, data: booking, error } = useQuery(
    //const y = useQuery(
    {
      queryKey: ['cabins'],
      queryFn: () => getBooking(bookingId),  //функция выборки данных
      retry: false, //без повторных попыток
    }
  );

  return { isLoading, booking, error };
}