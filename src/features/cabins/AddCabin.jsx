import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";


export default function AddCabin ()
{
  return (
    <>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Добавить новый коттедж</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open opens='table'>
          <Button>Доступные коттеджи</Button>
        </Modal.Open>
        <Modal.Window name='table'>
          <CabinTable />
        </Modal.Window>
      </Modal>
    </>
  );
}
