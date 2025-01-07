import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { BookingContext } from "../pages/Bookings";

const StyledFilter = styled.div.attrs({ name: 'filter' })`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

/* eslint-disable react/prop-types */
function Filter ({ filterField, options })
{
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;
  const { setPageParam } = useContext(BookingContext);

  function handlerOnClick (value)
  {
    //перед сменой фильтра новые данные должны отображаться со страницы 1
    //т.к. данных может быть меньше чем на 2 или более страницы
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
    setPageParam(1);
  }

  return (
    <StyledFilter>
      {
        options.map(opt =>
          <FilterButton
            onClick={() => handlerOnClick(opt.value)}
            key={opt.value}
            $active={currentFilter === opt.value}
            disabled={currentFilter === opt.value}
          >
            {opt.label}
          </FilterButton>
        )
      }
    </StyledFilter>
  );
}

export default Filter;
