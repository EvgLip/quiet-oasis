import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Row from "../ui/Row";

function Settings ()
{
  return (
    <Row>
      <Heading as="h1">Настройка политик отеля</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
