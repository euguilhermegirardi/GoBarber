import React from "react";

import GlobalStyles from "./styles/global";
import SignIn from "./pages/SignIn/index";
// import SignUp from "./pages/SignUp/index";
import { AuthProvider } from "./hooks/AuthContext";
import ToastContainer from "./components/ToastContainer";

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastContainer />
    <GlobalStyles />
  </>
);

export default App;
