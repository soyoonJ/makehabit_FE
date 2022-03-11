// 리다이렉트될 화면
import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Auth2RedirectHandler = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  // let state = new URL(window.location.href).searchParams.get("state");

  React.useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
    // dispatch(userActions.naverLogin(code, state));
  }, []);

  return null;
};

export default Auth2RedirectHandler;
