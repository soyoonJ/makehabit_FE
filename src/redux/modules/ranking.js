// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

// actions
const SET_RANKING = "SET_RANKING";

// action creators
const setRanking = createAction(SET_RANKING, (ranking_list) => ({
  ranking_list,
}));

// initialState
const initialState = {
  ranking_list: null,
};

// 인증기록하기 페이지 조회
const getRankingDB = (length) => {
  return function (dispatch, getState, { history }) {
    // console.log(challengeId);
    apis
      .GetRanking(length)
      .then(function (res) {
        console.log("랭킹조회", res.data);
        dispatch(setRanking(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// redux
export default handleActions(
  {
    [SET_RANKING]: (state, action) =>
      produce(state, (draft) => {
        draft.ranking_list = action.payload.ranking_list.me;
      }),
  },
  initialState
);

const actionCreators = {
  setRanking,
  getRankingDB,
};

export { actionCreators };
