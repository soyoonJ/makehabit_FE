// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import axios from "axios";

// actions
const SET_CHALLENGE = "SET_CHALLENGE";
const SET_TAB = "SET_TAB";
const SET_FEED = "SET_FEED";
const SET_CONFIRM = "SET_CONFIRM";

// action creators
const setChallenge = createAction(SET_CHALLENGE, (challenge_list) => ({
  challenge_list,
}));
const setTab = createAction(SET_TAB, (page) => ({ page }));
const setFeed = createAction(SET_FEED, (feed_list) => ({ feed_list }));
const setConfirm = createAction(SET_CONFIRM, (challenge_info) => ({
  challenge_info,
}));

// initialState
const initialState = {
  challenge_info: null,
  page: null,
  challenge_list: null,
  feed_list: null,
};

// 인증기록하기 페이지 조회
// 주현님 robo3T 조회하는거 알아오기
const getConfirmDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log(challengeId);
    apis
      .getConfirm(challengeId)
      .then(function (res) {
        console.log(res);
        // dispatch(setConfirm(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 인증 업로드
const confirmDB = (challengeId, imgForm, challengeTitle, comment) => {
  return function (dispatch, getState, { history }) {
    console.log("인증업로드", challengeId, imgForm, challengeTitle, comment);

    // apis.imageUpload(imgForm).then(function (res) {
    //   console.log("업로드된 이미지", res);

    //   // imageURL 들어가는 부분 데이터 한번 보고 수정해야하면 수정하기
    //   apis
    //     .confirm(challengeId, res.data, challengeTitle, comment)
    //     .then(function (res) {
    //       console.log(res);
    //       // 인증완료 후 넘겨지는 페이지에서 get 할거로 연결
    //       // dispatch(reducer(res.data));
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });
  };
};

// 하단네비 > 인증 > 내 챌린지보기
const naviChallengeDB = () => {
  return function (dispatch, getState, { history }) {
    console.log("인증, naviChallengeDB");
    // apis
    //   .naviChallenge()
    //   .then(function (res) {
    //     console.log(res);
    //     // dispatch(setChallenge(res.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
};

// 마이페이지 > 내 기록보기
const myChallengeDB = () => {
  return function (dispatch, getState, { history }) {
    console.log("마이페이지 myChallenge");
    // apis
    //   .myChallenge()
    //   .then(function (res) {
    //     console.log(res);
    //     // dispatch(setChallenge(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
};

// 내 기록보기 > 사진 하나 클릭 시 상세
const myfeedDB = (proofShotId) => {
  return function (dispatch, getState, { history }) {
    console.log("myfeedDB");
    // apis
    //   .oneFeed(proofShotId)
    //   .then(function (res) {
    //     console.log(res);
    //     // dispatch(setFeed(res.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
};

// redux
export default handleActions(
  {
    [SET_CONFIRM]: (state, action) =>
      produce(state, (draft) => {
        draft.challenge_info = action.payload.challenge_info;
      }),
    [SET_TAB]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.page);
        draft.page = action.payload.page;
      }),

    [SET_CHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        draft.challenge_list = action.payload.challenge_list;
      }),
    [SET_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.feed_list = action.payload.feed_list;
      }),
  },
  initialState
);

const actionCreators = {
  setConfirm,
  getConfirmDB,
  confirmDB,
  setTab,
  setChallenge,
  naviChallengeDB,
  myChallengeDB,
  setFeed,
  myfeedDB,
};

export { actionCreators };
