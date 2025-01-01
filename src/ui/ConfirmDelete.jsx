import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete ({ resourceName, onConfirm, onClose, disabled })
{

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Удаление: {resourceName}</Heading>
      <p>
        Вы уверены, что хотите удалить {resourceName} навсегда? Это
        действие не может быть отменено.
      </p>

      <div>
        <Button $variation="secondary" onClick={onClose} disabled={disabled}>
          Отменить
        </Button>
        <Button $variation="danger" onClick={onConfirm} disabled={disabled}>
          Удалить
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
