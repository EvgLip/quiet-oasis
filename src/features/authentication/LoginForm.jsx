import { useState } from "react";

import useLogin from "./useLogin";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm ()
{
  const [email, setEmail] = useState('popoveg@mail.ru');
  const [password, setPassword] = useState('12345678');
  const { login, isLoading } = useLogin();

  function handleSubmit (e)
  {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      { onSettled: () => { setEmail(''), setPassword(''); } }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email">
        <Input
          type="email"
          id="email"
          //Это делает данную форму более удобной для менеджеров паролей
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Пароль">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Вход' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
