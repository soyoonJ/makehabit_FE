// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import axios from "axios";

import { useDispatch } from "react-redux";

// actions
// const SET_USER = "SET_USER";

// action creators
// const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: { email: null, nickname: null },
  is_login: false,
};

// redux
export default handleActions(
  {
    //   [SET_TAB]: (state, action) =>
    //     produce(state, (draft) => {
    //       // console.log(action.payload.page);
    //       draft.page = action.payload.page;
    //     }),
  },
  initialState
);

const actionCreators = {
  // setTab,
};

export { actionCreators };
