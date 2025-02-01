import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useUpdateUser from "./useUpdateUser";

function UpdatePasswordForm ()
{
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit ({ password })
  {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} name="UpdatePasswordForm">
      <FormRow
        label="Новый пароль (мин 8 символов)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Обязательное поле",
            minLength: {
              value: 8,
              message: "Пароль не может быть менее 8 символов",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Подтверждение пароля"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Обязательное поле",
            validate: (value) =>
              getValues().password === value || "Пароли не совпадают",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" $variation="secondary">
          Отменить
        </Button>
        <Button disabled={isUpdating}>Изменить пароль</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
