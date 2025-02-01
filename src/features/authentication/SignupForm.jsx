import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUserSingup } from "./useUserSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm ()
{
  const { isLoading, userSignup } = useUserSingup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  function onSubmit ({ fullName, email, password })
  {
    userSignup(
      { fullName, email, password },
      {
        onSettled: () =>
        {
          reset();
          navigate('/');
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} name="SignupForm">
      <FormRow label="Имя" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: 'Обязательное поле' })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="off"
          {...register("email",
            {
              required: 'Обязательное поле',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Возможно вы указали неверный адрес эл.почты'
              }
            })
          }
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Пароль (минимум 8 символов)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="off"
          {...register("password",
            {
              required: 'Обязательное поле',
              minLength: {
                value: 8,
                message: 'Пароль не может быть меньше 8 символов',
              },
            })
          }
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Повторить пароль" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm",
            {
              required: 'Обязательное поле',
              validate: value => value === getValues('password') || 'Пароли не совпадают',
            })
          }
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/*type - это атрибут HTML!*/}
        <Button
          onClick={reset}
          $variation="secondary"
          type="reset"
          disabled={isLoading}
        >
          Отменить
        </Button>
        <Button disabled={isLoading}>
          Создать нового пользователя
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
