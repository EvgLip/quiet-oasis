import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { ORDER_STATUS } from "../../utils/constants";


export default function useRecentStays ()
{
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : parseInt(searchParams.get('last'));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery(
    {
      queryFn: () => getStaysAfterDate(queryDate),
      queryKey: ['stays', `last-${numDays}`],
    }
  );

  const confirmedStays = stays?.filter(stay => stay.status === ORDER_STATUS.checked_in || stay.status === ORDER_STATUS.checked_out);

  return { isLoading, stays, confirmedStays, numDays };
}