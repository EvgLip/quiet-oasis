import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useGetSettings from './useGetSettings';
import Spinner from '../../ui/Spinner';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm ()
{
  const { isUpdating, updateSetting } = useUpdateSetting();
  const { isLoading, settings:
    {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice
    } = {}
  } = useGetSettings();

  if (isLoading) return <Spinner />;

  function handleUpdate (e, fieldName)
  {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [fieldName]: value });
  }

  return (
    <Form>
      <FormRow label='Минимальное количество ночей при бронировании'>
        <Input type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          onBlur={e => handleUpdate(e, 'minBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Максимальное количество ночей при бронировании'>
        <Input type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Максимальное количество гостей при бронировании'>
        <Input type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Стоимость завтрака'>
        <Input type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
