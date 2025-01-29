import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { ORDER_STATUS } from "../utils/constants";

const originalSettings = {
  minBookingLength: 3,
  maxBookingLength: 30,
  maxGuestsPerBooking: 10,
  breakfastPrice: 250,
};

async function deleteGuests ()
{
  const { error } = await supabase.from("guests").delete().gt("id", 0); //больше чем
  if (error) console.log(error.message);
}

async function deleteCabins ()
{
  const { error } = await supabase.from("cabins").delete().gt("id", 0); //больше чем
  if (error) console.log(error.message);
}

async function deleteBookings ()
{
  const { error } = await supabase.from("bookings").delete().gt("id", 0); //больше чем
  if (error) console.log(error.message);
}

async function createGuests ()
{
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins ()
{
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings ()
{
  // Для бронирования требуется идентификатор гостя и номера домика. Мы не можем указать идентификаторы Supabase для каждого объекта, они будут рассчитываться самостоятельно. Поэтому у разных людей они могут отличаться, особенно после нескольких загрузок. Поэтому нам нужно сначала получить все идентификаторы гостей и кабинеты, а затем заменить исходные идентификаторы в данных бронирования на фактические из базы данных
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) =>
  {
    // Здесь мы полагаемся на порядок расположения коттеджей, 
    // так как у них еще нет id
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    //250 - стоимость завтрака
    const extrasPrice = booking.hasBreakfast
      ? originalSettings.breakfastPrice * numNights * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = ORDER_STATUS.checked_out; //"checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = ORDER_STATUS.unconfirmed; //"unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = ORDER_STATUS.checked_in; //"checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  //console.log('Uploader.createBookings.finalBookings ', finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader ()
{
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll ()
  {
    setIsLoading(true);
    // Сначала необходимо удалить все бронирования
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Заказы должны быть сделаны последними
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings ()
  {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>ОТЛАДОЧНЫЕ ДАННЫЕ</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Загрузить ВСЕ
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Загрузить ТОЛЬКО бронирование
      </Button>
    </div>
  );
}

export default Uploader;
