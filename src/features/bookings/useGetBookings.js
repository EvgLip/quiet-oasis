import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";

import { getBookings } from "../../services/apiBookings";
import { ORDER_STATUS, PAGE_SIZE } from "../../utils/constants";
import { BookingContext } from "../../pages/Bookings";

function useGetBookings ()
{
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  // const { page } = useContext(BookingContext);

  //Фильтрация данных
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all'
    ? null
    : { field: 'status', value: ORDER_STATUS[filterValue], };
  //например при использовании запросов с разными
  // методами фильтрации (см) https://supabase.com/docs/reference/dart/using-filters
  // { field: 'totalPrice', value: 50000, method: 'gte' };

  //Сортировка
  const paramsForSortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = paramsForSortBy.split('-');
  const sortBy = { field, ascending: direction === 'asc' };

  //Разбивка на страницы PAGINATION
  let page = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));
  //ЗАПРОС
  const { isLoading, error, data: { data: bookings = [], count = 0 } = {} } = useQuery(
    //const y = useQuery(
    {
      queryKey: ['bookings', filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page }),  //функция выборки данных
    }
  );

  //Предварительная выборка
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery(
      {
        queryKey: ['bookings', filter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page: page + 1 }), //функция выборки данных
      }
    );
  if (page > 1)
    queryClient.prefetchQuery(
      {
        queryKey: ['bookings', filter, sortBy, page - 1],
        queryFn: () => getBookings({ filter, sortBy, page: page - 1 }), //функция выборки данных
      }
    );

  //console.log('test for breakpoints');

  return { isLoading, bookings, count, error };
}

export default useGetBookings; 