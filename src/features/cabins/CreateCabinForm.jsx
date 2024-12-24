import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";


function CreateCabinForm ()
{
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation(
    {
      mutationFn: createCabin,
      onSuccess: () => 
      {
        queryClient.invalidateQueries({ queryKey: ['cabins'] });
        toast.success('Запись успешно добавлена.');
        reset();
      },
      onError: (err) => toast.error(err.message) //ошибка генерируется в apiCabins
    }
  );

  function onSubmit (data) { mutate(data); }

  function onError (errors) { console.log(errors); }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label='Наименование коттеджа' error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isCreating}
          {
          ...register('name',
            {
              required: 'Обязательное поле.',
            }

          )}
        />
      </FormRow>

      <FormRow label='Вместимость' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isCreating}
          {
          ...register('maxCapacity',
            {
              required: 'Обязательное поле.',
              min: {
                value: 1,
                message: 'Вместимость не может быть менее 1 человека.',
              }
            }

          )}
        />
      </FormRow>

      <FormRow label='Цена' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isCreating}
          {
          ...register('regularPrice',
            {
              required: 'Обязательное поле.',
              min: {
                value: 5000,
                message: 'Цена не может быть менее 5000 руб.',
              }
            }

          )}
        />
      </FormRow>

      <FormRow label='Скидка' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isCreating}
          {
          ...register('discount',
            {
              required: 'Обязательное поле.',
              validate: (value) => value <= getValues().regularPrice / 10 || 'Скидка не может быть более 10% от цены.'
            }

          )}
        />
      </FormRow>

      <FormRow label='Описание' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isCreating}
          {
          ...register('description',
            {
              required: 'Обязательное поле.',
            }

          )}
        />
      </FormRow>

      <FormRow label='Фото коттеджа'>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/*type - это атрибут HTML!*/}
        <Button variation="secondary" type="reset">
          Очистить
        </Button>
        <Button disabled={isCreating}>Сохранить</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
