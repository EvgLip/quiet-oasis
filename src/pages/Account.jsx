import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';

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
        <p>Форма изменения пароля</p>
      </Row>
    </>
  );
}

export default Account;
