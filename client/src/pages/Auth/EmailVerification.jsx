import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { emailVerification } from "../../reducer/Actions";
import { useDispatch } from "react-redux";

export const EmailVerification = () => {
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const { key } = useParams();
  const handlingSubmit = (e) => {
    e.preventDefault();
    emailVerification(key)(dispatch);
    setStatus(true);
  };
  if (status) {
    return <Navigate to={"../login/"}></Navigate>;
  }
  return (
    <div className="main-box">
      <h2 className="text-center mb-4">Activate Account</h2>
      <h5 className="text-center mb-4">
        Click the bellow link to activate your account
      </h5>
      <form className="mb-3" onSubmit={(e) => handlingSubmit(e)}>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Activar cuenta
          </button>
        </div>
      </form>
    </div>
  );
};
