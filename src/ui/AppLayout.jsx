import { Outlet } from "react-router";
import styled from 'styled-components';

import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledApplayout = styled.div.attrs({ name: 'app-layout' })`
  display:grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows:auto 1fr;
  height:100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const Container = styled.div.attrs({ name: 'container' })`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin: 0 auto;
  max-width: 120rem;
`;


export default function AppLayout ()
{
  return (
    <StyledApplayout>
      <Header />
      <Sidebar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

    </StyledApplayout>
  );
}
