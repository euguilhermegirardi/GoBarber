import React from "react";

import GlobalStyles from "./styles/global";
import SignIn from "./pages/SignIn/index";
// import SignUp from "./pages/SignUp/index";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyles />
  </>
);

export default App;
