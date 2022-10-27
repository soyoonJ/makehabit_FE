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
const getSearch = createAction(GET_SEARCH, (search_data) => ({
  search_data,
}));

const getCategory = createAction(GET_CATEGOTY,(category_data) => ({category_data}));
const newCategory = createAction(GET_NEW, (new_list_data) => ({
  new_list_data,
}));

const studyCategory = createAction(GET_STUDY, (study_list_data) => ({
  study_list_data,
}));

const getRecommend = createAction(GET_RECOMMEND, (recommend_list) => ({
  recommend_list,
}));

// initialState
const initialState = {
  searchWord_list: [],
  category_list: [],
  category: [],
  recommend_list: [],
  new_list: [],
  study_list: [],

  search_data: {challenges:[]},
  category_data: {challenges:[]},
  new_list_data: {challenges:[]},
  study_list_data: {challenges:[]},
};

// 미들웨어
const getSearchDB = (searchWord) => {
  return function (dispatch, getState, { history }) {
    apis
      .mainSearch(searchWord)
      .then(function (res) {
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
        .category(categoryId)
        .then(function (res) {
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
        dispatch(getCategory(res.data));
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

//메인 신규 목록조회
const mainnewDB = (recommendLength, categoryId) => {
  return function (dispatch, getState, { history }) {
    apis
      .maincategory(recommendLength, categoryId) //
      .then(function (res) {
        dispatch(newCategory(res.data));
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

//메인 스터디 목록조회
const mainstudyDB = (recommendLength, categoryId) => {
  return function (dispatch, getState, { history }) {
    apis
      .maincategory(recommendLength, categoryId) //
      .then(function (res) {
        // console.log("잘 들어가느냐!!!", res.data);
        dispatch(studyCategory(res.data));
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

//reducer
export default handleActions(
  {
    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.searchWord_list = action.payload.search_data.challenges;
      }),

    [GET_CATEGOTY]: (state, action) =>
      produce(state, (draft) => {
        draft.category_list = action.payload.category_data.challenges;
      }),

    [GET_RECOMMEND]: (state, action) =>
      produce(state, (draft) => {
        draft.recommend_list = action.payload.recommend_list;
      }),

    [GET_NEW]: (state, action) =>
      produce(state, (draft) => {
        draft.new_list = action.payload.new_list_data.challenges;
      }),

    [GET_STUDY]: (state, action) =>
      produce(state, (draft) => {
        // console.log("카테고리 목록 조회", action.payload);
        draft.study_list = action.payload.study_list_data.challenges;
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
