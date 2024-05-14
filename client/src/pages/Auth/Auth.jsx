import { Route, Routes } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";
import { EmailVerification } from "./EmailVerification";

export const Auth = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="dj-rest-auth/registration/account-confirm-email/:key/"
          element={<EmailVerification />}
        ></Route>
      </Routes>
    </>
  );
};
