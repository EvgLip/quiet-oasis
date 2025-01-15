import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account ()
{
  return (
    <>
      <Heading as="h1">Изменение учетной записи</Heading>

      <Row>
        <Heading as="h3">Изменение данных пользователя</Heading>
        <p>Форма внесения изменений</p>
      </Row>

      <Row>
        <Heading as="h3">Изменение пароля</Heading>
        <p>Форма изменения пароля</p>
      </Row>
    </>
  );
}

export default Account;
