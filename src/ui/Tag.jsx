import styled from "styled-components";

const Tag = styled.span`
  padding: 0.4rem 1.2rem;
  width: fit-content;

  text-align:center;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 100px;

  /* динамическое изменение, основываясь на полученных props */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

export default Tag;
