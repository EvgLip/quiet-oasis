import styled, { css } from "styled-components";

const sizes = {
  small: css`
    padding: 1rem 0.8rem;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  `,
  medium: css`
    padding: 1.2rem 1.6rem;
    font-size: 1.4rem;
    font-weight: 500;
  `,
  large: css`
    padding: 1.2rem 2.4rem;
    font-size: 1.6rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }

    &:disabled {
      color: var(--color-brand-600);
      background-color: var(--color-brand-50);
      border: 1px solid var(--color-brand-600);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }

    &:disabled {
      color: var(--color-grey-400);
      background-color: var(--color-grey-200);
      border: 1px solid var(--color-grey-400);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }

    &:disabled {
      color: var(--color-red-700);
      background-color: var(--color-red-100);
      border: 1px solid var(--color-red-700);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${props => sizes[props.$size]}
  ${props => variations[props.$variation]}
`;

Button.defaultProps =
{
  $variation: 'primary',
  $size: 'medium',
};

export default Button;