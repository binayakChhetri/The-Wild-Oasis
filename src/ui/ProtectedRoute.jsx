/* eslint-disable */

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var() (--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // We will return the children if the user is authenticated

  //   1.) Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2.) If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      // Will be directed to login page if user is not authenticated and is not loading too.
      if (!isAuthenticated && !isLoading) return navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3.) While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4.) If there IS  a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
