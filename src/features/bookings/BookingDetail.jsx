import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBooking from "./useGetBooking";
import { ORDER_STATUS } from "../../utils/constants";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail ()
{
  const { isLoading, booking, error } = useGetBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    [ORDER_STATUS.unconfirmed]: "blue",
    [ORDER_STATUS.checked_in]: "green",
    [ORDER_STATUS.checked_out]: "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Бронирование № {bookingId}</Heading>
          <span>Статус: </span>
          <Tag type={statusToTagName[status]}>{status}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Назад</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === ORDER_STATUS.unconfirmed &&
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Регистрация
          </Button>
        }

        <Button $variation="secondary" onClick={moveBack}>
          Назад
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
