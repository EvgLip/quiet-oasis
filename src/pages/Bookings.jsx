import { createContext, useEffect, useState } from "react";

import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useSearchParams } from "react-router-dom";

export const BookingContext = createContext();

function Bookings ()
{

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(function ()
  {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  }, [page, searchParams, setSearchParams]);

  function setPageParam (pageNum)
  {
    setPage(pageNum);
  }

  return (
    <BookingContext.Provider value={{ page, setPageParam, }}>
      <Row type="horizontal">
        <Heading as="h1">Бронирование</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </BookingContext.Provider>
  );
}

export default Bookings;
