import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useGetBookings from "./useGetBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable ()
{
  const { isLoading, bookings, count, error } = useGetBookings();

  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resoursName={'бронирование'} />;

  return (
    <Menus>
      <Table $columns="8rem 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div role="columnheader">Коттедж</div>
          <div role="columnheader">Гость</div>
          <div role="columnheader">Даты</div>
          <div role="columnheader">Статус</div>
          <div role="columnheader">Внесенная сумма</div>
          <div role="columnheader">Поле</div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
