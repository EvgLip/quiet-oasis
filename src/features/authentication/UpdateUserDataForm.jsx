import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm ()
{
  // Нам не нужно состояние загрузки, и мы можем сразу же использовать пользовательские данные, потому что мы знаем, что они уже были загружены на данный момент (беруться из кэша)
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { isUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit (e)
  {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () =>
        {
          setAvatar(null);
          e.target.reset();
        }
      }
    );
  }

  function handlerCancel ()
  {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Полное имя">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Аватарка">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          onClick={handlerCancel}
          type="reset"
          $variation="secondary"
          disabled={isUpdating}>
          Отменить
        </Button>
        <Button disabled={isUpdating}>
          Применить изменения
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
