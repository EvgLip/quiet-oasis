import { useNavigate } from "react-router";
import { HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import useGetBooking from "./useGetBooking";
import useDeleteBooking from "./useDeleteBooking";
import useCheckout from "../check-in-out/useCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";

import BookingDataBox from "./BookingDataBox";
import { ORDER_STATUS } from "../../utils/constants";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;


function BookingDetail ()
{
  const { isLoading, booking } = useGetBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  if (isLoading || isCheckingOut) return <Spinner />;
  if (!booking) return <Empty resoursName='Бронирование' />;

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

        {status === ORDER_STATUS.checked_in &&
          <Button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Выписать
          </Button>
        }

        <Modal>
          <Modal.Open opens='delete-booking'>
            <Button
              $variation="danger"
              icon={<HiTrash />}
            >
              {`Удалить бронирование № ${bookingId}`}
            </Button>
          </Modal.Open>

          <Modal.Window name='delete-booking'>
            <ConfirmDelete
              resourceName={`бронирование № ${bookingId}`}
              onConfirm={() => deleteBooking(bookingId, { onSettled: () => navigate(-1), })}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Назад
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
