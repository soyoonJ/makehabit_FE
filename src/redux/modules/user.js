// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import axios from "axios";

import { useDispatch } from "react-redux";

// actions
const SET_USER = "SET_USER";

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
    user: { email: null, nickname: null },
    is_login: false,
  };


// 로그인
const loginDB = (email, password) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(email, password)
      .then((res) => {
        console.log(res)
        // localStorage.setItem("login-token", res.data.token);
        // dispatch(setUser(정보);

      })
      .catch(function (error) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      });
  };
};

// 리듀서
export default handleActions(
    {
      [SET_USER]: (state, action) =>
        produce(state, (draft) => {
          // console.log('hi!!!!!!!!', action.payload.user.email);
          draft.user.email = action.payload.user.email;
        }),
    },
    initialState
  );


// action creator export
const actionCreators = {
    setUser,

  };
  
export { actionCreators };
  


