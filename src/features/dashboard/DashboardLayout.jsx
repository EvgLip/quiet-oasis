import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout ()
{

  return (
    <StyledDashboardLayout>
      <div>Статистика</div>
      <div>Текущая операции</div>
      <div>График продолжительности пребывания</div>
      <div>График продаж</div>
    </StyledDashboardLayout>
  );
}