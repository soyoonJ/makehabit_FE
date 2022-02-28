// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import axios from "axios";

import { useDispatch } from "react-redux";

// actions
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const EMAIL_CHECK = "EMAIL_CHECK";
const NICKNAME_CHECK = "NICKNAME_CHECK";

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
const emailCheck = createAction(EMAIL_CHECK, (result) => ({ result }));
const nicknameCheck = createAction(NICKNAME_CHECK, (result) => ({ result }));

// initialState
const initialState = {
  user: { email: null, nickname: null },
  is_login: false,
};

// 회원가입
const signupDB = (email, nickname, password, confirmPassword) => {
  return function (dispatch, getState, { history }) {
    // console.log(email, nickname, password, confirmPassword)
    apis
      .signup(email, nickname, password, confirmPassword)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//이메일 체크
const emailCheckDB = (email) => {
  return function (dispatch, getState, { history }) {
    apis
      .emailCheck(email)
      .then((response) => {
        console.log(response);
        //   dispatch(emailCheck({ response }))
        //   window.alert("사용 가능한 아이디 입니다.")
      })
      .catch((error) => {
        console.log(error);
        //   const error_message = error.response.data.result
        //   if (error_message === "false") {
        //     window.alert("사용 중인 아이디 입니다!")
        //   }
      });
  };
};

//닉네임 체크
const nicknameCheckDB = (nickname) => {
  return function (dispatch, getState, { history }) {
    apis
      .nicknameCheck(nickname)
      .then((response) => {
        console.log(response);
        //   dispatch(nicknameCheck(response))
        //   window.alert("사용 가능한 닉네임 입니다.")
      })
      .catch((error) => {
        console.log(error);
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
        console.log(res);
        // localStorage.setItem("token", res.data.token);
        // dispatch(setUser({
        //     email,
        //     nickname: res.data.user.nickname,
        // }));

        // history.push('/');
      })
      .catch(function (error) {
        // console.log(error);
        alert("아이디 또는 비밀번호를 확인해주세요.");
      });
  };
};

// 카카오 API
const getKakaoProfile = () => {
  return function (dispatch, getState, { history }) {
    window.Kakao.API.request({
      url: "/v2/user/me",
    })
      .then(function (res) {
        // console.log('코멘트전체확인',res.data.comments);
        // 코멘트리스트 불러오기
        const email = res.id;

        apis.loginKakao(email).then((res) => {
          console.log(res);
          //   if (!res.data.result) {
          //     alert("회원정보가 올바르지 않습니다.");
          //     return;
          //   }
          //   localStorage.setItem("token", res.data.token);
          //   dispatch(setUser({ email: email }));
        });
      })

      .catch(function (error) {
        console.log(error);
      });
  };
};

// 로그인 체크
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .loginCheck()
      .then((res) => {
        console.log(res);
        //   if(res.data.user) {
        //     dispatch(setUser({ email: res.data.email, nickname: res.data.nickname }));
        //   } else {
        //       dispatch(logOut());
        //   }
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
        draft.user.email = action.payload.user.email;
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
        draft.idCheck = true;
        draft.is_loaded = true;
      }),
    [NICKNAME_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.nicknameCheck = true;
        draft.is_loaded = true;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setUser,
  logOut,
  loginDB,
  signupDB,
  loginCheckDB,
  getKakaoProfile,
};

export { actionCreators };
