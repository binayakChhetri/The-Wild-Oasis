import styled from "styled-components";

const Aside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;
`;

function Sidebar() {
  return <Aside>Sidebar</Aside>;
}

export default Sidebar;
