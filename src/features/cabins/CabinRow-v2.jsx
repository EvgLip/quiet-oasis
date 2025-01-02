import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  justify-content: start;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;
//eslint-disable-next-line
function CabinRow ({ cabin })
{
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image: imagePath } = cabin;

  function handleDuplicate ()
  {
    createCabin(
      {
        name: `Копия - ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image: '',
      }
    );
  }

  return (
    <TableRow role="row">
      <Img src={imagePath} />
      <Cabin>{name}</Cabin>
      <div>для {maxCapacity} чел</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <Actions>
        <button onClick={handleDuplicate} disabled={isCreating}><HiSquare2Stack /></button>
        <Modal>
          <Modal.Open opens='update-cabin'>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name='update-cabin'>
            <CreateCabinForm cabinToUpdate={cabin} />
          </Modal.Window>

          <Modal.Open opens='delete-cabin'>
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name='delete-cabin'>
            <ConfirmDelete
              resourceName={`коттедж ${cabin.name}`}
              onConfirm={() => deleteCabin({ cabinId, imagePath })}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </Actions>
    </TableRow>
  );
}

export default CabinRow

