import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useGetBookings ()
{
  const [searchParams] = useSearchParams();


  const { isLoading, data: bookings, error } = useQuery(
    //const y = useQuery(
    {
      queryKey: ['bookings'],
      queryFn: getBookings,  //функция выборки данных
    }
  );

  return { isLoading, bookings, error };
}

export default useGetBookings; 