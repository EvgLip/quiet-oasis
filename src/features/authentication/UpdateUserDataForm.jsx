import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";

function UpdateUserDataForm ()
{
  // Нам не нужно состояние загрузки, и мы можем сразу же использовать пользовательские данные, потому что мы знаем, что они уже были загружены на данный момент
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit (e)
  {
    e.preventDefault();
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
        />
      </FormRow>
      <FormRow label="Аватарка">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" $variation="secondary">
          Отменить
        </Button>
        <Button>Применить изменения</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
