import { useNavigate } from "react-router";
import styled from "styled-components";
import { format, isToday } from "date-fns";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { declensionWordNight, formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { ORDER_STATUS } from "../../utils/constants";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sofia Sans";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sofia Sans";
  font-weight: 500;
`;
/* eslint-disable react/prop-types */
function BookingRow ({ booking:
  {
    id: bookingId,
    //created_at,
    startDate,
    endDate,
    numNights,
    //numGuests,
    totalPrice,
    status,
    guests: { email, fullName: guestName },
    cabins: { name: cabinName },
  }
})
{
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const statusToTagName = {
    [ORDER_STATUS.unconfirmed]: "blue",
    [ORDER_STATUS.checked_in]: "green",
    [ORDER_STATUS.checked_out]: "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>email{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Сегодня"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; на {numNights} {declensionWordNight(numNights)}
        </span>
        <span>
          {format(new Date(startDate), "dd MM yyyy")} &mdash;{" "}
          {format(new Date(endDate), "dd MM yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>
        {status}
      </Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/booking/${bookingId}`)}
            >
              Детали
            </Menus.Button>

            {status === ORDER_STATUS.unconfirmed &&
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Регистрация
              </Menus.Button>
            }

            {status === ORDER_STATUS.checked_in &&
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Выписать
              </Menus.Button>
            }

            <Modal.Open opens='delete-booking'>
              <Menus.Button icon={<HiTrash />} >Удалить</Menus.Button>
            </Modal.Open>

          </Menus.List>
        </Menus.Menu>

        <Modal.Window name='delete-booking'>
          <ConfirmDelete
            resourceName={`бронирование № ${bookingId}`}
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>

    </Table.Row>
  );
}

export default BookingRow;
