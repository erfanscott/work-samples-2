import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Root from "./routes/Root";
import Offers from "./routes/Offers";
import SignIn from "./routes/SignIn";
import Profile from "./routes/Profile";
import SignUp from "./routes/SignUp";
import ForgotPassword from "./routes/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dummy from "./routes/Dummy";
import ProtectedRoute from "./routes/ProtectedRoute";
function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/dummy" element={<Dummy />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
