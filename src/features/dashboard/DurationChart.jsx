import styled from "styled-components";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import Heading from "../../ui/Heading";
import { useModeToggleContext } from "../../contexts/ModeToggleContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: '1 ночь',
    value: 0,
    color: "#f13434",
  },
  {
    duration: '2 ночи',
    value: 0,
    color: "#eb7b2b",
  },
  {
    duration: '3 ночи',
    value: 0,
    color: "#eab308",
  },
  {
    duration: '4-5 ночей',
    value: 0,
    color: "#97c84e",
  },
  {
    duration: '6-7 ночей',
    value: 0,
    color: "#11d75a",
  },
  {
    duration: '8-14 ночей',
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: '15-21 ночи',
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "более 21 ночи",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: '1 ночь',
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: '2 ночи',
    value: 0,
    color: "#98411e",
  },
  {
    duration: '3 ночи',
    value: 0,
    color: "#9f6719",
  },
  {
    duration: '4-5 ночей',
    value: 0,
    color: "#5c8920",
  },
  {
    duration: '6-7 ночей',
    value: 0,
    color: "#0e8439",
  },
  {
    duration: '8-14 ночей',
    value: 0,
    color: "#136962",
  },
  {
    duration: '15-21 ночи',
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: 'более 21 ночи',
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData (startData, stays)
{
  function incArrayValue (arr, field)
  {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) =>
    {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, '1 ночь');
      if (num === 2) return incArrayValue(arr, '2 ночи');
      if (num === 3) return incArrayValue(arr, '3 ночи');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 ночей');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 ночей');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 ночей');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 ночи');
      if (num >= 21) return incArrayValue(arr, 'более 21 ночи');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}
/* eslint-disable react/prop-types */
export default function DurationChart ({ confirmedStays })
{
  const { isDarkMode } = useModeToggleContext();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox name='duration-chart'>
      <Heading as='h3'>
        График продолжительности пребывания
      </Heading>
      <ResponsiveContainer width='100%' height='100%' >
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            nameKey='duration'
            dataKey='value'
            outerRadius={100}
            innerRadius={70}
            cx='45%'
            cy='45%'
            paddingAngle={2}
            label={true}
          >
            {
              data.map(entry =>
              (<Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />))
            }
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width='30%'
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
