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
  ranking_list: [],
  my_list: null,
};

// 인증기록하기 페이지 조회
const getRankingDB = (length) => {
  return function (dispatch, getState, { history }) {
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
        draft.my_list = action.payload.ranking_list.me;
        // draft.ranking_list = action.payload.ranking_list.RankingList;
        // console.log("확인", draft.my_list, action.payload.ranking_list.me);
        draft.ranking_list = action.payload.ranking_list.RankingList.filter(
          (e) => e.proofCnt > 0
        );

        console.log("확인", draft.ranking_list);
      }),
  },
  initialState
);

const actionCreators = {
  setRanking,
  getRankingDB,
};

export { actionCreators };
