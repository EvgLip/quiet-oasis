import styled from "styled-components";
import Heading from "./Heading";
import GlobalStales from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 4.8rem;
  background-color: var(--color-grey-50);
`;

const Box = styled.div`
  /* Box */
  padding: 4.8rem;
  flex: 0 1 96rem;

  text-align: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sofia Sans";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

/* eslint-disable react/prop-types */
export default function ErrorFallback ({ error, resetErrorBoundary })
{

  return (
    <>
      <GlobalStales />
      <StyledErrorFallback>
        <Box>
          <Heading as='h1'>Что-то пошло не так🤔</Heading>
          <p>{error.message}</p>
          <Button $size='large' onClick={resetErrorBoundary}>
            Попробывать еще раз
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}