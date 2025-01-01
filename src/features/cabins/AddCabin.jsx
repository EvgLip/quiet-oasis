import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";


export default function AddCabin ()
{
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenModal(show => !show)}>
        Добавить новый коттедж
      </Button>
      {
        isOpenModal &&
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm closeModalMode={() => setIsOpenModal(false)} />
        </Modal>
      }
    </>
  );
}
