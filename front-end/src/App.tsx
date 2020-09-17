import React from "react";

import GlobalStyles from "./styles/global";
import SignIn from "./pages/SignIn/index";
// import SignUp from "./pages/SignUp/index";
import AppProvider from "./hooks";

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyles />
  </>
);

export default App;
