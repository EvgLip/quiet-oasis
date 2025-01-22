import styled from "styled-components";

import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useGetCabins from "../cabins/useGetCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout ()
{
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const { isLoading: isLoadingStays, stays, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoadingCabins, cabins } = useGetCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      >
        Статистика
      </Stats>
      <div>Текущая операции</div>
      <div>График продолжительности пребывания</div>
      <div>График продаж</div>
    </StyledDashboardLayout >
  );
}