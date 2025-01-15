import styled from "styled-components";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: var(--color-grey-50);
`;

/* eslint-disable react/prop-types */
export default function ProtectedRoute ({ children })
{
  const navigate = useNavigate();

  //1. пытаемся загрузить авторизированного user
  const { isLoading, isAuthenticated } = useUser();

  //2. если авторизированного user нет, направляем на страницу /login
  useEffect(function ()
  {
    if ((!isAuthenticated && !isLoading)) navigate('/login', { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  //3. во время loading отображаем spinner
  if (isLoading) return (
    <FullPage>
      <Spinner />;
    </FullPage>
  );

  //4. если есть авторизированный user, render the app
  if (isAuthenticated) return (
    children
  );
}
