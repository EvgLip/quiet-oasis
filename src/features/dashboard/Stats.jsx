import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

/* eslint-disable react/prop-types */
export default function Stats ({ bookings, confirmedStays, numDays, cabinCount })
{
  //1.кол-во бронирований
  const numBookings = bookings.length;
  //2.продажи 
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3.зарегистрировано
  const checkins = confirmedStays.length;
  //4.заполняемость
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat
        title='Кол-во бронирований'
        color='blue' icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Продажи'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Прошли регистрацию'
        color='indigo' icon={<HiOutlineCalendarDays />}
        value={checkins} />
      <Stat
        title='Уровень заполняемости'
        color='yellow' icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'} />
    </>
  );
}