import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';

function Account ()
{
  return (
    <>
      <Heading as="h1">Изменение учетной записи</Heading>

      <Row>
        <Heading as="h3">Изменение данных пользователя</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Изменение пароля</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
