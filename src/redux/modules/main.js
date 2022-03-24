// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

// import axios from "axios"
const GET_SEARCH = "GET_SEARCH";
const GET_CATEGOTY = "GET_CATEGOTY";
const GET_RECOMMEND = "GET_RECOMMEND";
const GET_NEW = "GET_NEW";
const GET_STUDY = "GET_STUDY";

// action creators
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
const newCategory = createAction(GET_NEW, (new_list) => ({
  new_list,
}));

const studyCategory = createAction(GET_STUDY, (study_list) => ({
  study_list,
}));

const getRecommend = createAction(GET_RECOMMEND, (recommend_list) => ({
  recommend_list,
}));

// initialState
const initialState = {
  searchWord_list: [],
  category_list: [],
  recommend_list: [],
  new_list: [],
  study_list: [],
  isLoading: true,
};

// 미들웨어
// 메인-검색기능
const getSearchDB = (searchWord) => {
  return function (dispatch, getState, { history }) {
    console.log("메인이다!!!!!!!!!!!!!!!!!!!!!!", searchWord);
    apis
      .mainSearch(searchWord) // 메인페이지에서 dispatch 값 데이터
      .then(function (res) {
        console.log("검색데이타!!!!", res.data);
        dispatch(getSearch(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//메인-추천삼일
const RecommendDB = (recommendLength, categoryId) => {
  return function (dispatch, getState, { history }) {
    if (categoryId) {
      apis
        .category(categoryId) //
        .then(function (res) {
          // console.log("잘 들어가느냐!!!", res.data);
          dispatch(getRecommend(res.data.challenges));
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } else {
      apis
        .mainRecommend(recommendLength)
        .then(function (res) {
          console.log("추천삼일모듈", res.data.challenges);
          dispatch(getRecommend(res.data.challenges));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
};

//카테고리 목록조회
const categoryDB = (categoryId) => {
  return function (dispatch, getState, { history }) {
    apis
      .category(categoryId) //
      .then(function (res) {
        // console.log("잘 들어가느냐!!!", res.data);
        dispatch(getCategory(res.data));
      })
      .catch((error) => {
        console.log(error);
        return;
      });
    // .then(function (res) {
    //   history.push(`/category/${categoryId}`);
    // });
  };
};

//메인 신규 목록조회
const mainnewDB = (recommendLength, categoryId) => {
  return function (dispatch, getState, { history }) {
    apis
      .maincategory(recommendLength, categoryId) //
      .then(function (res) {
        // console.log("잘 들어가느냐!!!", res.data);
        dispatch(newCategory(res.data));
      })
      .catch((error) => {
        console.log(error);
        return;
      });
    // .then(function (res) {
    // history.push(`/category/${categoryId}`);
    // });
  };
};

//메인 스터디 목록조회
const mainstudyDB = (recommendLength, categoryId) => {
  return function (dispatch, getState, { history }) {
    apis
      .maincategory(recommendLength, categoryId) //
      .then(function (res) {
        console.log("잘 들어가느냐!!!", res.data);
        dispatch(studyCategory(res.data));
      })
      .catch((error) => {
        console.log(error);
        return;
      });
    // .then(function (res) {
    // history.push(`/category/${categoryId}`);
    // });
  };
};

//reducer (redux에 저장하는 부분)
export default handleActions(
  {
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.keyword);
        draft.searchWord_list = action.payload.searchWord_list.challenges;
      }),

    //카테고리 목록 가져오는 부분
    [GET_CATEGOTY]: (state, action) =>
      produce(state, (draft) => {
        // console.log("카테고리 목록 조회", action.payload);
        // draft는 복사본 만드는 느낌
        //action.payload 는 서버에서 응답 받아온 값
        // 여기 list.challenges로 적은 이유는 map 돌리는 부분에서 간소화하기위함
        draft.category_list = action.payload.category_list.challenges;
        draft.checkLoadAll = action.payload.checkLoadAll;
      }),

    [GET_RECOMMEND]: (state, action) =>
      produce(state, (draft) => {
        console.log("추천!!!목록!!리스트!!!", action.payload.recommend_list);
        draft.recommend_list = action.payload.recommend_list;
        draft.isLoading = false;
      }),

    [GET_NEW]: (state, action) =>
      produce(state, (draft) => {
        console.log("카테고리 목록 조회", action.payload);
        draft.new_list = action.payload.new_list.challenges;
        draft.isLoading = false;
      }),

    [GET_STUDY]: (state, action) =>
      produce(state, (draft) => {
        console.log("카테고리 목록 조회", action.payload);
        draft.study_list = action.payload.study_list.challenges;
        draft.isLoading = false;
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
  getRecommend,
  mainnewDB,
  mainstudyDB,
};

export { actionCreators };
