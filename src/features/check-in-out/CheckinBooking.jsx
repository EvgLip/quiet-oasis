import { useEffect, useState } from "react";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import useGetBooking from "../bookings/useGetBooking";
import useGetSettings from "../settings/useGetSettings";
import useCheckin from "./useCheckin";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const Message = styled.div.attrs({ name: 'message' })`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-grow: 1;
  padding: 0 4rem;
`;

function CheckinBooking ()
{
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useGetBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckinIn } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useGetSettings();

  useEffect(() => setAddBreakfast(booking?.hasBreakfast ?? false), [booking?.hasBreakfast]);

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking?.isPaid]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    cabinPrice,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

  const refund = isPaid && hasBreakfast && !addBreakfast; //возврат
  const additionalPayment = isPaid && !hasBreakfast && addBreakfast; //доплата

  let amount = totalPrice; //сумма
  if (refund) amount = amount - optionalBreakfastPrice;
  if (additionalPayment) amount = amount + optionalBreakfastPrice;
  if (!isPaid) amount = addBreakfast ? cabinPrice + optionalBreakfastPrice : cabinPrice;

  function handleCheckin ()
  {
    if (!confirmPaid) return;

    checkin(
      {
        bookingId,
        breakfast:
        {
          hasBreakfast: addBreakfast,
          extrasPrice: addBreakfast ? optionalBreakfastPrice : 0,
          totalPrice: amount,
        }
      }
    );
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Регистрация бронирования № {bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Назад</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => setAddBreakfast(addBreakfast => !addBreakfast)}
          id='breakfast'
          disabled={isCheckinIn}
        >
          {
            hasBreakfast
              ? 'Завтрак включен в стоимость проживания'
              : `Добавить стоимость завтрака в размере ${formatCurrency(optionalBreakfastPrice)} в общую стоимость проживания.`
          }

        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(confirm => !confirm)}
          id='confirm'
          disabled={(booking?.isPaid ?? false) || isCheckinIn}
        // disabled={(confirmPaid) || isCheckinIn}
        >
          {isPaid && `${guests.fullName} оплатил(а) сумму в размере ${formatCurrency(totalPrice)}`}
          {!isPaid && `${guests.fullName} оплатил(а) сумму в размере ${formatCurrency(amount)}`}
        </Checkbox>
      </Box>


      <ButtonGroup>
        <Message>
          {refund && `Возврат  ${formatCurrency(optionalBreakfastPrice)}`}
          {additionalPayment && `Доплатить  ${formatCurrency(optionalBreakfastPrice)}`}
        </Message>

        <Button onClick={handleCheckin}
          disabled={!confirmPaid || isCheckinIn}
        >
          Регистрация бронирования № {bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
