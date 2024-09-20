import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Users from "./pages/Users";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Cabins from "./pages/Cabins";
import PageNotFound from "./pages/PageNotFound";
import Account from "./pages/Account";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";

// This is the query client, which basically sets up the cache behind the scenes.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime is the amount of time that the data in the cache will stay fresh
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* 
        <Navigate replace to="dashboard" /> 
        This will basically redirect the route to the dashboard
        /dashboard
      */}
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
