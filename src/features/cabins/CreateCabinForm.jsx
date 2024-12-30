import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";


function CreateCabinForm ({ cabinToUpdate = {} })
{
  const { id: updateId, ...updateValue } = cabinToUpdate; // из <CabinRow/>
  const isUdateSession = Boolean(updateId); //сеанс обновления записи в БД

  const { register, handleSubmit, reset, getValues, formState } = useForm(
    { defaultValues: isUdateSession ? updateValue : {} }
  );
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isUdating, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isUdating;

  function onSubmit (data)
  {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isUdateSession) updateCabin(
      { newCabinData: { ...data, image }, id: updateId }, //data - данные формы подготовленные для update в БД
      {
        //data - возвращенные из БД после успешной обновления данных
        onSuccess: () => reset()
      }
    );
    else createCabin(
      { ...data, image: image }, //data - данные формы подготовленные для записи в БД
      {
        //data - возвращенные из БД после успешной записи данных, содержит id новой записи
        onSuccess: () => reset()
      }
    );
  }

  function onError (errors) { console.log(errors); }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label='Наименование коттеджа' error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking}
          {
          ...register('name',
            {
              required: 'Не указано имя коттеджа.',
            }
          )}
        />
      </FormRow>

      <FormRow label='Вместимость' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking}
          {
          ...register('maxCapacity',
            {
              required: 'Не указано на сколько человек расчитан коттедж.',
              min: {
                value: 1,
                message: 'Вместимость не может быть менее 1 человека.',
              }
            }
          )}
        />
      </FormRow>

      <FormRow label='Цена' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking}
          {
          ...register('regularPrice',
            {
              required: 'Не указана цена.',
              min: {
                value: 5000,
                message: 'Цена не может быть менее 5000 руб.',
              }
            }
          )}
        />
      </FormRow>

      <FormRow label='Скидка' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking}
          {
          ...register('discount',
            {
              required: 'Не указана возможная скидка.',
              validate: (value) => value <= getValues().regularPrice / 10 || 'Скидка не может быть более 10% от цены.'
            }
          )}
        />
      </FormRow>

      <FormRow label='Описание' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking}
          {
          ...register('description',
            {
              required: 'Нет описания коттеджа.',
            }
          )}
        />
      </FormRow>

      <FormRow label='Фото коттеджа'>
        <FileInput id="image" accept="image/*"
          {
          ...register('image',
            {
              required: isUdateSession ? false : 'Необходимо выбрать изображение.',
            }
          )}
        />
      </FormRow>

      <FormRow>
        {/*type - это атрибут HTML!*/}
        <Button variation="secondary" type="reset">
          Очистить
        </Button>
        <Button disabled={isWorking}>Сохранить</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
