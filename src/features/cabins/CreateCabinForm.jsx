import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

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

  function onSubmit (data)
  {
    mutate(data);
  }

  function onError (errors)
  {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Наименование коттеджа</Label>
        <Input type="text" id="name"
          {
          ...register('name',
            {
              required: 'Обязательное поле.',
            }

          )}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Вместимость</Label>
        <Input type="number" id="maxCapacity"
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
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Цена</Label>
        <Input type="number" id="regularPrice"
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
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Скидка</Label>
        <Input type="number" id="discount" defaultValue={0}
          {
          ...register('discount',
            {
              required: 'Обязательное поле.',
              validate: (value) => value <= getValues().regularPrice / 10 || 'Скидка не может быть более 10% от цены.'
            }

          )}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Описание</Label>
        <Textarea type="number" id="description" defaultValue=""
          {
          ...register('description',
            {
              required: 'Обязательное поле.',
            }

          )}
        />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
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
