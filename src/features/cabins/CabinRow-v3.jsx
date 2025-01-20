import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

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
  font-family: "Sofia Sans";
`;

const Price = styled.div`
  font-family: "Sofia Sans";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sofia Sans";
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
        image: '', //пустая строка, чтобы при удалении записи не удалить файл изображения
      }
    );
  }

  return (
    <Table.Row>
      <Img src={imagePath} role="cell" />
      <Cabin role="cell">{name}</Cabin>
      <div role="cell">для {maxCapacity} чел</div>
      <Price role="cell">{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount role="cell">{formatCurrency(discount)}</Discount> : <span role="cell">&mdash;</span>}
      <Actions role="cell">
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
    </Table.Row>
  );
}

export default CabinRow

