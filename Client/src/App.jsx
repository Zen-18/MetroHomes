import { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "react-query/devtools";
import UserDetailContext from "./Context/UserDetailContext";
import { useAuthContext } from "./hooks/useAuthContext";
import Layout from "./components/layout/Layout";
import Website from "./pages/Website";
import Properties from "./pages/Properties/Properties";
import Property from "./pages/Property/Property";
import Login from "./pages/Login-Signup/Login";
import Signup from "./pages/Login-Signup/Signup";

function App() {
  const { user } = useAuthContext();
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Routes without Layout */}
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" replace={true} />}
              />
              <Route
                path="/signup"
                element={
                  !user ? <Signup /> : <Navigate to="/" replace={true} />
                }
              />

              {/* Routes with Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
