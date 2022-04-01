// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

// actions
const SET_CHALLENGE = "SET_CHALLENGE";
const SET_TAB = "SET_TAB";
const SET_FEED = "SET_FEED";
const SET_CONFIRM = "SET_CONFIRM";
const SET_PROOF = "SET_PROOF";
const SET_COMPLETE = "SET_COMPLETE";

// action creators
const setChallenge = createAction(SET_CHALLENGE, (challenge_list) => ({
  challenge_list,
}));
const setProofshots = createAction(SET_PROOF, (proof_list) => ({ proof_list }));
const setTab = createAction(SET_TAB, (page) => ({ page }));
const setFeed = createAction(SET_FEED, (feed) => ({ feed }));
const setConfirm = createAction(SET_CONFIRM, (challenge_info) => ({
  challenge_info,
}));
const setComplete = createAction(SET_COMPLETE, (confirm_info) => ({
  confirm_info,
}));

// initialState
const initialState = {
  challenge_info: null,
  page: null,
  challenge_list: null,
  proof_list: null,
  feed: null,
  totalCnt: null,
  point: null,
  isUpload: false,
};

// 인증기록하기 페이지 조회
const getConfirmDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    // console.log(challengeId);

    apis
      .getConfirm(challengeId)
      .then(function (res) {
        // console.log("인증조회", res);
        dispatch(setConfirm(res.data));
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

// 인증 업로드
const confirmDB = (challengeId, imgForm, challengeTitle, comment) => {
  return function (dispatch, getState, { history }) {
    // console.log("인증업로드", challengeId, imgForm, challengeTitle, comment);

    apis
      .imageUpload(imgForm)
      .then(function (res) {
        // console.log("업로드된 이미지", res);

        apis
          .confirm(challengeId, res.data.imgUrl, challengeTitle, comment)
          .then(function (res) {
            // console.log("인증완료", res.data);
            dispatch(setComplete(res.data));
            history.push("/completed/confirm");
          })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 하단네비 > 인증 > 내 챌린지보기
const naviChallengeDB = () => {
  return function (dispatch, getState, { history }) {
    // console.log("인증, naviChallengeDB");
    apis
      .naviChallenge()
      .then(function (res) {
        // console.log(res);
        dispatch(setChallenge(res.data.challenges));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// 마이페이지 > 내 기록보기
const myChallengeDB = () => {
  return function (dispatch, getState, { history }) {
    // console.log("마이페이지 myChallenge");
    apis
      .myChallenge()
      .then(function (res) {
        // console.log(res);
        dispatch(setProofshots(res.data.proofShots));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 내 기록보기 > 사진 하나 클릭 시 상세
const myfeedDB = (proofShotId) => {
  return function (dispatch, getState, { history }) {
    // console.log("myfeedDB");
    apis
      .oneFeed(proofShotId)
      .then(function (res) {
        // console.log(res);
        dispatch(setFeed(res.data.proofShot));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const changeCommentDB = (proofshotId, comment) => {
  return function (dispatch, getState, { history }) {
    apis
      .changeFeed(proofshotId, comment)
      .then(function (res) {
        // console.log(res);
        dispatch(myfeedDB(proofshotId));
      })
      .catch((error) => {
        // console.log(error);
        window.alert(error.response.data.message);
      });
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
        draft.page = action.payload.page;
      }),

    [SET_CHALLENGE]: (state, action) =>
      produce(state, (draft) => {
        draft.challenge_list = action.payload.challenge_list;
        // draft.isLoading = false;
      }),
    [SET_PROOF]: (state, action) =>
      produce(state, (draft) => {
        draft.proof_list = action.payload.proof_list.reverse();
        // draft.isLoading = false;
      }),
    [SET_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.feed = action.payload.feed;
        // draft.isLoading = false;
      }),
    [SET_COMPLETE]: (state, action) =>
      produce(state, (draft) => {
        draft.isUpload = true;
        draft.totalCnt = action.payload.confirm_info.totalCnt;
        draft.point = action.payload.confirm_info.point;
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
  setProofshots,
  myChallengeDB,
  setFeed,
  myfeedDB,
  setComplete,
  changeCommentDB,
};

export { actionCreators };
