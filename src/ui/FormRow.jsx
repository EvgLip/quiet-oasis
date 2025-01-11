import styled from "styled-components";

const StyledFormRow = styled.div.attrs({ name: 'form-row' })`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1.2fr 1fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0.5rem;
  }

  &:last-child {
    padding-bottom: 0.3rem;
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
//eslint-disable-next-line
export default function FormRow ({ label, error, children })
{
  return (
    <StyledFormRow>
      {/*eslint-disable-next-line */}
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
