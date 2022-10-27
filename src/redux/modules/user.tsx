import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import axios from "axios";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const EMAIL_CHECK = "EMAIL_CHECK";
const NICKNAME_CHECK = "NICKNAME_CHECK";
const SET_INFO = "SET_INFO";

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
const emailCheck = createAction(EMAIL_CHECK, (result) => ({ result }));
const nicknameCheck = createAction(NICKNAME_CHECK, (result) => ({ result }));
const setInfo = createAction(SET_INFO, (user_info) => ({ user_info }));

const initialState = {
  user: { email: '', nickname: '' },
  is_login: false,
  emailCheck: 0, //0 = 이메일 형식을 확인해주세요 ,-1 = 이미 가입된 이메일 입니다, 1 =  사용 가능한 이메일
  nicknameCheck: 0, //0 = 닉네임 형식을 확인해주세요 ,-1 = 이미 가입된 닉네임 입니다, 1 =  사용 가능한 닉네임
  user_info: null,
  result: 0,
  is_loaded: false
};

const signupDB = (email, nickname, password, confirmPassword) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(email, nickname, password, confirmPassword)
      .then((res) => {
        window.alert(res.data.message);
        history.push("/login");
      })
      .catch(function (error) {
        window.alert(error.response.data.message);
      });
  };
};

const emailCheckDB = (email) => {
  return function (dispatch, getState, { history }) {
    apis
      .emailCheck(email)
      .then((response) => {
        dispatch(emailCheck(1));
      })
      .catch((error) => {
        const error_message = error.response.data.message;
        if (error_message === "이메일 형식을 확인해주세요.") {
          dispatch(emailCheck(0));
        } else {
          dispatch(emailCheck(-1));
        }
      });
  };
};

const nicknameCheckDB = (nickname) => {
  return function (dispatch, getState, { history }) {
    apis
      .nicknameCheck(nickname)
      .then((response) => {
        dispatch(nicknameCheck(1));
      })
      .catch((error) => {
        const error_message = error.response.data.message;
        if (
          error_message ===
          "닉네임은 3자 이상, 15자 이하의 영어,한자,숫자로만 구성되어야 합니다."
        ) {
          dispatch(nicknameCheck(0));
        } else {
          dispatch(nicknameCheck(-1));
        }
      });
  };
};

const loginDB = (email, password) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(
          setUser({
            email,
            nickname: res.data.nickname,
          })
        );
        history.push("/");
      })
      .catch(function (error) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      });
  };
};

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `https://makehabitapi.shop/api/users/kakao/callback?code=${code}`,
    })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch(
          setUser({
            nickname: res.data.nickname,
          })
        );
        history.push("/");
      })
      .catch(function (error) {
        console.log("kakaoLogin", error);
      });
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .loginCheck()
      .then((res) => {
        if (res.data) {
          dispatch(
            setUser({
              email: res.data.email,
              nickname: res.data.nickname,
            })
          );
        } else {
          dispatch(logOut());
          window.alert("로그인 정보가 없습니다. 다시 로그인 해주세요");
          history.push("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
    alert("다음에 또 만나요!");
    history.push("/");
  };
};

const getInfoDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .mypageUserInfo()
      .then((res) => {
        dispatch(setInfo(res.data.user));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("token");
        draft.user = null;
        draft.is_login = false;
      }),
    [EMAIL_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.emailCheck = action.payload.result;
        draft.is_loaded = true;
      }),
    [NICKNAME_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.nicknameCheck = action.payload.result;
        draft.is_loaded = true;
      }),
    [SET_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload.user_info;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  logoutDB,
  logOut,
  loginDB,
  signupDB,
  emailCheckDB,
  nicknameCheckDB,
  loginCheckDB,
  kakaoLogin,
  setInfo,
  getInfoDB,
};

export { actionCreators };
