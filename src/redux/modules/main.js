// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

// import axios from "axios"
const GET_SEARCH = "GET_SEARCH";
const GET_CATEGOTY = "GET_CATEGOTY";

// action creators (스토어에 )
const getSearch = createAction(GET_SEARCH, (searchWord_list) => ({
  searchWord_list,
}));
const getCategory = createAction(
  GET_CATEGOTY,
  (category_list, checkLoadAll) => ({
    category_list,
    checkLoadAll,
  })
);

// initialState
const initialState = {
  searchWord_list: [],
  category_list: [],
};

// 미들웨어
// 메인-검색기능
const getSearchDB = (searchWord) => {
  return function (dispatch, getState, { history }) {
    console.log("메인이다!!!!!!!!!!!!!!!!!!!!!!", searchWord);
    apis
      .mainSearch(searchWord) // 메인페이지에서 dispatch 값 데이터
      .then(function (res) {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//메인-추천삼일(보류보류보류)
const RecommendDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .mainRecommend()
      .then(function (res) {
        console.log(res);
        // dispatch(getSearch({
        // searchWord,
        // challengeId : res.data.searchWord.challengeId ,
        // participants : res.data.searchWord.participants ,
        // }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//카테고리 목록조회
const categoryDB = (categoryId) => {
  return function (dispatch, getState, { history }) {
    console.log("렌더링이 되었느냐!", categoryId);

    apis
      .category(categoryId) //
      .then(function (res) {
        console.log("잘 들어가느냐!!!", res);
        // dispatch(getCategory(res.data));
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function (res) {
        history.push(`/category/${categoryId}`);
      });
  };
};

//reducer (redux에 저장하는 부분)
export default handleActions(
  {
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.keyword);
        draft.searchWord_list = action.payload.searchWord_list;
      }),

    //카테고리 목록 가져오는 부분
    [GET_CATEGOTY]: (state, action) =>
      produce(state, (draft) => {
        console.log("카테고리 목록 조회", action.payload);
        // draft는 복사본 만드는 느낌
        //action.payload 는 서버에서 응답 받아온 값
        // 여기 list.challenges로 적은 이유는 map 돌리는 부분에서 간소화하기위함
        draft.category_list = action.payload.category_list.challenges;
        draft.checkLoadAll = action.payload.checkLoadAll;
      }),
  },

  initialState
);

const actionCreators = {
  getSearch,
  getSearchDB,
  RecommendDB,
  categoryDB,
  getCategory,
};

export { actionCreators };
