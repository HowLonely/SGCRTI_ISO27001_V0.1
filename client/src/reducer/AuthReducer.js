import { showNotification } from "@mantine/notifications";
import TYPE from "./Type";

const initialState = {
  access_token: localStorage.getItem("access_token"),
  user: localStorage.getItem("user"),
  message: "",
};

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPE.LOGIN_SUCCESS:
      localStorage.setItem("access_token", payload.access);
      localStorage.setItem("user", payload.user)
      showNotification({
        title: "✅ HA INICIADO SESIÓN CORRECTAMENTE",
        message: "",
        color: "green",
      });

      return {
        ...state,
        access_token: payload.access,
        isAuthenticated: true,
        user: payload.user,
        message: "✅ Se ha logeado correctamente",
      };
    case TYPE.LOGIN_FAIL:
      localStorage.removeItem("access_token");
      showNotification({
        title: "❌ ERROR AL INICIAR SESIÓN",
        message: "",
        color: "red",
      });
      return {
        ...state,
        access_token: null,
        isAuthenticated: false,
        user: null,
        message: "❌ Error al iniciar sesión",
      };
    case TYPE.VERIFY_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case TYPE.VERIFY_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case TYPE.GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case TYPE.GET_USER_FAIL:
      return {
        ...state,
        user: null,
      };
    case TYPE.REFRESH_SUCCESS:
      localStorage.setItem("access_token", payload.access);
      return {
        ...state,
        access_token: payload.access,
        isAuthenticated: true,
        message: "Refresh token success",
      };
    case TYPE.REFRESH_FAIL:
      localStorage.removeItem("access_token");
      return {
        ...state,
        access_token: null,
        isAuthenticated: false,
        user: null,
        message: "Refresh token fail",
      };
    case TYPE.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        message: "Change password success",
      };
    case TYPE.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        message: "Change password fail",
      };
    case TYPE.SIGNUP_SUCCESS:
      showNotification({
        title:
          "✅ EL LINK PARA VERIFICAR SU CUENTA HA SIDO ENVIADO A SU CORREO",
        message: "",
        color: "green",
      });
      return {
        ...state,
        message: "Verification link has sent to your email",
      };
    case TYPE.SIGNUP_FAIL:
      showNotification({
        title: "❌ SU CUENTA NO HA PODIDO SER CREADA",
        message: "",
        color: "red",
      });
      return {
        ...state,
        message: "Signup fail",
      };
    case TYPE.ACTIVATE_ACCOUNT_SUCCESS:
      showNotification({
        title: "✅ SU CUENTA HA SIDO VERIFICADA",
        message: "",
        color: "green",
      });
      return {
        ...state,
        message: "Your account has been verified",
      };
    case TYPE.ACTIVATE_ACCOUNT_FAIL:
      showNotification({
        title: "❌ SU CUENTA NO HA SIDO VERIFICADA",
        message: "",
        color: "red",
      });
      return {
        ...state,
        message: "Verification account has failed",
      };
    case TYPE.RESET_SUCCESS:
      return {
        ...state,
        message: "Reset password success",
      };
    case TYPE.RESET_FAIL:
      return {
        ...state,
        message: "Reset password fail",
      };
    case TYPE.SET_SUCCESS:
      return {
        ...state,
        message: "Your new password has been setted",
      };
    case TYPE.SET_FAIL:
      return {
        ...state,
        message: "Set new password failed",
      };
    case TYPE.LOGOUT:
      localStorage.removeItem("access_token");
      return {
        ...state,
        access_token: null,
        isAuthenticated: false,
        user: null,
        message: "User has logged out",
      };
    case TYPE.CLOSE_ALERT:
      return {
        ...state,
        message: "",
      };
    case TYPE.GUEST_VIEW:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default AuthReducer;
