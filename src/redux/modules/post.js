// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SET_TAB = "SET_TAB";

// action creators
const setTab = createAction(SET_TAB, (page) => ({ page }));

// initialState
const initialState = {
  page: null,
};

// redux
export default handleActions(
  {
    [SET_TAB]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.page);
        draft.page = action.payload.page;
      }),
  },
  initialState
);

const actionCreators = {
  setTab,
};

export { actionCreators };
