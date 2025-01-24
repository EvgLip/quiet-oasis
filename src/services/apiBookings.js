import supabase from "./supabase";

import { getToday } from "../utils/helpers";
import { ORDER_STATUS, PAGE_SIZE } from "../utils/constants";

//////////////////////////////////////////////////////////////
export async function getBookings ({ filter, sortBy, page })
{
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

  //ФИЛЬТРАЦИЯ
  //если нужно использовать несколько фильтров, то можно передавать массив объектов filter
  //и затем в цикле добавлять query = query[filter.method || 'eq'](filter.field, filter.value);
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  //СОРТИРОВКА
  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.ascending });

  //РАЗБИВКА НА СТРАНИЦЫ PAGINATION
  if (page)
  {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error)
  {
    console.error(error);
    throw new Error("Невозможно прочитать данные о бронировании.");
  }

  return { data, count };
}

//////////////////////////////////////////////////////////////
export async function getBooking (id)
{
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error)
  {
    console.error(error);
    throw new Error("Сведения о бронировании не найдены.");
  }

  return data;
}

//////////////////////////////////////////////////////////////
// Возвращает все БРОНИРОВАНИЯ, созданные после указанной даты. 
// Полезно, например, для получения данных о бронированиях, созданных за последние 30 дней.
// Дата ISOString
export async function getBookingsAfterDate (date)
{
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error)
  {
    console.error(error);
    throw new Error("Не удалось загрузить сведения о бронировании.");
  }

  return data;
}

//////////////////////////////////////////////////////////////
// Возвращает все записи, которые были созданы после указанной даты
// по каждому пользователю
export async function getStaysAfterDate (date)
{
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error)
  {
    console.error(error);
    throw new Error("Не удалось загрузить сведения о бронировании.");
  }

  return data;
}

//////////////////////////////////////////////////////////////
// Активность означает, что сегодня есть регистрация заезда или отъезда
export async function getStaysTodayActivity ()
{
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.${ORDER_STATUS.unconfirmed},startDate.eq.${getToday()}),and(status.eq.${ORDER_STATUS.checked_in},endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Эквивалентно этому.
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))
  // Запрашивая это, загружаются только те данные, которые действительно нужны, а не все когда-либо созданные бронирования

  if (error)
  {
    console.error(error);
    throw new Error("Не удалось загрузить сведения о бронировании.");
  }
  return data;
}

//////////////////////////////////////////////////////////////
export async function updateBooking (id, obj)
{
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error)
  {
    console.error(error);
    throw new Error("Не удалось обновить данные по бронированию.");
  }
  return data;
}

//////////////////////////////////////////////////////////////
export async function deleteBooking (id)
{
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error)
  {
    console.error(error);
    throw new Error(`Не удалось удалить бронирование № ${id}.`);
  }
  return data;
}
