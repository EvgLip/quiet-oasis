import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const AppStyle = styled.div`
  height: 100px;
  font-size: 32px;
`;

export default function App ()
{
  return (
    <>
      <GlobalStyles />
      <Heading as="h1">Это заголовок первого уровня</Heading>
      <AppStyle>
        <Row type="horizontal">
          <Heading as="h2">А это - второго</Heading>
          <Heading as="h3">И наконец третий уровень</Heading>
          Привет Вит. Как твои мои дела?
        </Row>
      </AppStyle>
    </>
  );
}
