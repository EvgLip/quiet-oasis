import styled from "styled-components";
import { ORDER_STATUS } from "../../utils/constants";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import { declensionWordNight } from "../../utils/helpers";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 11rem 4rem 1fr 5rem 13rem;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
/* eslint-disable react/prop-types */
export default function TodayItem ({ activity })
{
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === ORDER_STATUS.unconfirmed && <Tag type='green'>на регистрацию</Tag>}
      {status === ORDER_STATUS.checked_in && <Tag type='blue'>на выписку</Tag>}

      <Flag src={guests.countryFlag} alt={`флаг ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>
        {numNights} {declensionWordNight(numNights)}
      </div>

      {
        status === ORDER_STATUS.unconfirmed &&
        <Button
          $size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Зарегитрировать
        </Button>
      }

      {
        status === ORDER_STATUS.checked_in &&
        <CheckoutButton bookingId={id} />
      }
    </StyledTodayItem >
  );
}
