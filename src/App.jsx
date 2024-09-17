import styled from "styled-components";

// styled.h1`` -> This basically returns the component.
// So we use uppercase variable name to store it.
// Also these style components are able to receive all the same props that the regular HTML or JSX can receive.
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: #800080;
  color: white;
  cursor: pointer;

  margin: 20px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

// If we want to style the component that already exists, then we do the following.

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert("Ouch!!!")}>Click Me</Button>
        <Button onClick={() => alert("Ouch!!!")}>Click Me</Button>
        <Input type="number" placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
