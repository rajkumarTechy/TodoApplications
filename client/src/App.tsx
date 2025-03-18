import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Admin from "./components/Admin";
import User from "./components/User";
import AuthProvider from "./AuthContext";
import RoleProtected from "./RoleProtected";
import Unauthorized from "./components/unauthorized";
import ForgotPassord from "./components/ForgotPassord";
import ResetPassword from "./components/ResetPassword";
import RegisterForm from "./components/RegisterForm";
import User1 from "./components/User1";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="admin"
            element={
              <RoleProtected allowedRoles={["admin"]}>
                <Admin />
              </RoleProtected>
            }
          />
          <Route
            path="user"
            element={
              <RoleProtected allowedRoles={["user"]}>
                <User />
              </RoleProtected>
            }
          />
          <Route
            path="users-normal-page"
            element={
              <RoleProtected allowedRoles={["user"]}>
                <User1 />
              </RoleProtected>
            }
          />
          <Route path="forget-password" element={<ForgotPassord />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
