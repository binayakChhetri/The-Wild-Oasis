import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Remove all queries in cache after logut
      queryClient.removeQueries();

      //   Navigate to login page after logout
      navigate("./login", { replace: true });
    },
  });

  return { logout, isLoading };
}

export { useLogout };
