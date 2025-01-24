import styled from "styled-components";
import { ru } from 'date-fns/locale';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { useModeToggleContext } from "../../contexts/ModeToggleContext";
import { formattedDate } from "../../utils/helpers";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
// данные для отладки
// const fakeData = [
//   { label: "Янв 09", totalSales: 480, extrasSales: 20 },
//   { label: "Янв 10", totalSales: 580, extrasSales: 100 },
//   { label: "Янв 11", totalSales: 550, extrasSales: 150 },
//   { label: "Янв 12", totalSales: 600, extrasSales: 50 },
//   { label: "Янв 13", totalSales: 700, extrasSales: 150 },
//   { label: "Янв 14", totalSales: 800, extrasSales: 150 },
//   { label: "Янв 15", totalSales: 700, extrasSales: 200 },
//   { label: "Янв 16", totalSales: 650, extrasSales: 200 },
//   { label: "Янв 17", totalSales: 600, extrasSales: 300 },
//   { label: "Янв 18", totalSales: 550, extrasSales: 100 },
//   { label: "Янв 19", totalSales: 700, extrasSales: 100 },
//   { label: "Янв 20", totalSales: 800, extrasSales: 200 },
//   { label: "Янв 21", totalSales: 700, extrasSales: 100 },
//   { label: "Янв 22", totalSales: 810, extrasSales: 50 },
//   { label: "Янв 23", totalSales: 950, extrasSales: 250 },
//   { label: "Янв 24", totalSales: 970, extrasSales: 100 },
//   { label: "Янв 25", totalSales: 900, extrasSales: 200 },
//   { label: "Янв 26", totalSales: 950, extrasSales: 300 },
//   { label: "Янв 27", totalSales: 850, extrasSales: 200 },
//   { label: "Янв 28", totalSales: 900, extrasSales: 100 },
//   { label: "Янв 29", totalSales: 800, extrasSales: 300 },
//   { label: "Янв 30", totalSales: 950, extrasSales: 200 },
//   { label: "Янв 31", totalSales: 1100, extrasSales: 300 },
//   { label: "Фев 01", totalSales: 1200, extrasSales: 400 },
//   { label: "Фев 02", totalSales: 1250, extrasSales: 300 },
//   { label: "Фев 03", totalSales: 1400, extrasSales: 450 },
//   { label: "Фев 04", totalSales: 1500, extrasSales: 500 },
//   { label: "Фев 05", totalSales: 1400, extrasSales: 600 },
//   { label: "Фев 06", totalSales: 1450, extrasSales: 400 },
// ];

/////////////////////////////////////////////////////////////
/* eslint-disable react/prop-types */
export default function SalesChart ({ bookings, numDays })
{
  const { isDarkMode } = useModeToggleContext();

  const allDates = eachDayOfInterval(
    {
      start: subDays(new Date(), numDays - 1),
      end: new Date(),
    }
  );

  const data = allDates.map(date =>
  {
    return {
      label: format(date, 'MMM dd', { locale: ru }),
      totalSales: bookings
        .filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  }
  );

  const colors = isDarkMode
    ? {
      totalSales: { stroke: "#c7d2fe", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

  return (
    <StyledSalesChart name='sales-chart'>
      <Heading as='h3'>
        Продажи с {formattedDate(allDates.at(0))} по {formattedDate(allDates.at(-1))}
      </Heading>
      <ResponsiveContainer width='100%' height={300}>

        <AreaChart data={data} margin={{ left: 70 }}>
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <YAxis
            unit='руб'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <CartesianGrid
            strokeDasharray='5' />

          <Tooltip
            contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey='totalSales'
            type='monotone'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={1}
            name="Общие продажи"
            unit='руб'
          />
          <Area
            dataKey='extrasSales'
            type='monotone'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={1}
            name="Продажи доп услуг"
            unit='руб'
          />

        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}