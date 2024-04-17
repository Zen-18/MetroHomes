import { Suspense, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import Lawyers from "./pages/Lawyers/Lawyers";
import Loans from "./pages/Loans/Loans";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Message } from "./pages/message";
import Lawyer from "./pages/Lawyer/Lawyer";
import ForgotPassword from "./pages/Auth/ForgetPassword";

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
                exact
                path="/forgot-password/:emailToken"
                element={<ForgotPassword />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/signup" element={user ? <Message /> : <Signup />} />
              <Route
                path="/verify-email/:emailToken"
                element={<VerifyEmail />}
              />
              <Route path="/verifyemail" element={<Message />} />
              {/* Routes with Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/Lawyers">
                  <Route index element={<Lawyers />} />
                  <Route path=":lawyerId" element={<Lawyer />} />
                </Route>
                <Route path="/loans" element={<Loans />} />
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
