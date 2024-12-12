import { Outlet } from "react-router";
import styled from 'styled-components';

import Header from "./Header";
import Sidebar from "./Sidebar";

const Main = styled.main`
  background-color: #5cd75c;
  padding: 4rem 4.8rem 6.4rem;
`;


export default function AppLayout ()
{
  return (
    <>
      <Header />
      <Sidebar />

      <Main>
        <Outlet />
      </Main>

    </>
  );
}
