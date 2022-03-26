// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import axios from "axios";

// actions
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const EMAIL_CHECK = "EMAIL_CHECK";
const NICKNAME_CHECK = "NICKNAME_CHECK";
const SET_INFO = "SET_INFO";

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
const emailCheck = createAction(EMAIL_CHECK, (result) => ({ result }));
const nicknameCheck = createAction(NICKNAME_CHECK, (result) => ({ result }));
const setInfo = createAction(SET_INFO, (user_info) => ({ user_info }));
// let authorization_code = new URL(window.location.href).searchParams.get("code");

// initialState
const initialState = {
  user: { email: null, nickname: null },
  is_login: false,
  emailCheck: 0, //0 = 이메일 형식을 확인해주세요 ,-1 = 이미 가입된 이메일 입니다, 1 =  사용 가능한 이메일
  nicknameCheck: 0, //0 = 닉네임 형식을 확인해주세요 ,-1 = 이미 가입된 닉네임 입니다, 1 =  사용 가능한 닉네임
};

// 회원가입
const signupDB = (email, nickname, password, confirmPassword) => {
  return function (dispatch, getState, { history }) {
    // console.log(email, nickname, password, confirmPassword)
    apis
      .signup(email, nickname, password, confirmPassword)
      .then((res) => {
        // console.log(res);
        window.alert(res.data.message);
        history.push("/login");
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        window.alert(error.response.data.message);
        // console.log(error.message);
      });
  };
};

//이메일 체크
const emailCheckDB = (email) => {
  return function (dispatch, getState, { history }) {
    console.log("호출 전 email", email);
    apis
      .emailCheck(email)
      .then((response) => {
        dispatch(emailCheck(1));
        // window.alert("사용 가능한 아이디 입니다.")
      })
      .catch((error) => {
        console.log("emailcheckdberror", error, error.response.data.message);

        const error_message = error.response.data.message;
        if (error_message === "이메일 형식을 확인해주세요.") {
          dispatch(emailCheck(0));
        } else {
          dispatch(emailCheck(-1));
        }
      });
  };
};

//닉네임 체크
const nicknameCheckDB = (nickname) => {
  return function (dispatch, getState, { history }) {
    apis
      .nicknameCheck(nickname)
      .then((response) => {
        dispatch(nicknameCheck(1));
      })
      .catch((error) => {
        console.log("nicknamecheckdberror", error, error.response.data.message);

        const error_message = error.response.data.message;
        if (
          error_message ===
          "닉네임은 3자 이상, 15자 이하의 영어,한자,숫자로만 구성되어야 합니다."
        ) {
          dispatch(nicknameCheck(0));
        } else {
          dispatch(nicknameCheck(-1));
        }

        //   const error_message = error.response.data.result
        //   if (error_message === "false") {
        //     window.alert("사용 중인 닉네임 입니다!")
        //   }
      });
  };
};

// 로그인
const loginDB = (email, password) => {
  return function (dispatch, getState, { history }) {
    // console.log(email, password);
    apis
      .login(email, password)
      .then((res) => {
        // console.log(res);
        // console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        // 서버에서 받아온 정보를 리덕스에 저장해주는 액션
        dispatch(
          setUser({
            email,
            nickname: res.data.nickname,
            // token: res.data.token,
          })
        );
        history.push("/");
        // window.location.href = "/";
      })
      .catch(function (error) {
        // console.log(error);
        alert("아이디 또는 비밀번호를 확인해주세요.");
      });
  };
};

// 카카오 API
const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    // console.log("I'mINNNN");
    // Kakao.API.request({
    //   url: '/v1/user/unlink',
    //   success: function(response) {
    //     console.log(response);
    //   },
    //   fail: function(error) {
    //     console.log(error);
    //   },
    // });
    axios({
      method: "GET",
      url: `https://juhyeon.shop/api/users/kakao/callback?code=${code}`,
    })
      .then((res) => {
        // console.log("카카오오오", res);
        const token = res.data.token;
        localStorage.setItem("token", token); //예시로 로컬에 저장
        dispatch(setUser());
        history.push("/");
      })
      .catch(function (error) {
        console.log("kakaoLogin", error);
      });
  };
};

// 로그인 체크
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
              // token: localStorage.getItem("token"),
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

// 로그아웃
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
        console.log("getInfoDB", res.data);
        // dispatch(setInfo(res.data))
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // localStorage.setItem("token", action.payload.user.token);
        draft.user = action.payload.user;
        // console.log(action.payload.user);
        // console.log(draft.user);
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

// action creator export
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
