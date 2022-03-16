// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

// actions
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const DETAIL_POST = "DETAIL_POST";
//참여하기
const EDIT_JOIN = "EDIT_JOIN";

//좋아요
const EDIT_LIKE = "EDIT_LIKE";

const addPost = createAction(ADD_POST, (challengeId) => ({ challengeId }));

const editJoin = createAction(EDIT_JOIN, (nickname, isPush) => ({
  nickname,
  isPush,
}));

const editLike = createAction(EDIT_LIKE, (challengeId, isPush) => ({
  challengeId,
  isPush,
}));

const getDetailPost = createAction(DETAIL_POST, (post) => ({
  post,
}));

// initialState
const initialState = {
  page: null,
  challengId: "",
  post: [],
};

//게시물 등록
const addPostDB = (
  title,
  category,
  thumbnail,
  startAt,
  content,
  howtoContent,
  tag
) => {
  return function (dispatch, useState, { history }) {
    console.log("게시물 등록");
    apis
      .imageUpload(thumbnail)
      .then(function (response) {
        console.log("업로드된 이미지", response);
        console.log(
          "dat",
          title,
          category,
          response.data.imgUrl,
          startAt,
          content,
          howtoContent,
          tag
        );
        apis
          .createChallenge(
            title,
            category,
            response.data.imgUrl,
            startAt,
            content,
            howtoContent,
            tag
          )
          .then((response) => {
            console.log("게시물 등록", response);
            dispatch(addPost(response.data.challengeId));
          })
          .catch(function (error) {
            console.log("addpostDB_error", error);
          });
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

//이미지 업로드
const uploadImageDB = (challengeId, imgUrl, challengeTitle, comment) => {
  return function (dispatch, useState, { history }) {
    console.log("이미지 업로드");
    apis
      .confirm(challengeId, imgUrl, challengeTitle, comment)
      .then((response) => {
        console.log("이미지 업로드");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//상세페이지 불러오기
const getDetailPostDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log("상세페이지");
    apis
      .detail(challengeId)
      .then((response) => {
        console.log("상세페이지", response);
        dispatch(getDetailPost(response.data));
        history.push(`/challenges/${challengeId}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

//참여하기
const joinDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log("참여하기");
    apis
      .join(challengeId)
      .then((response) => {
        console.log("참여하기");
        dispatch(editJoin(challengeId, true));
      })
      .catch(function (error) {
        console.log(error);
        window.alert(error.response.data.message);
      });
  };
};

//참여취소하기
const joinCancelDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log("참여취소하기");
    apis
      .joinCancel(challengeId)
      .then((response) => {
        console.log("참여취소하기");
        dispatch(editJoin(challengeId, false));
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        dispatch(getDetailPostDB(challengeId));
      });
  };
};

//찜하기
const likeDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log("좋아요");
    apis
      .like(challengeId)
      .then((response) => {
        console.log("좋아요");
        dispatch(editLike(challengeId, true));
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        dispatch(getDetailPostDB(challengeId));
      });
  };
};

//찜하기 취소하기
const dislikeDB = (challengeId) => {
  return function (dispatch, getState, { history }) {
    console.log("싫어요");
    apis
      .dislike(challengeId)
      .then((response) => {
        console.log("싫어요");
        dispatch(editLike(challengeId, false));
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        dispatch(getDetailPostDB(challengeId));
      });
  };
};

// redux
export default handleActions(
  {
    // [SET_TAB]: (state, action) =>
    //   produce(state, (draft) => {
    //     // console.log(action.payload.page);
    //     draft.page = action.payload.page;
    //   }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.challengeId = action.payload.challengeId;
      }),
    [DETAIL_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log("Detail_post", action.payload);
        draft.post = action.payload.post;
        draft.is_loaded = true;
        // draft.post.comments = action.payload.comments;
      }),
    [EDIT_JOIN]: (state, action) =>
      produce(state, (draft) => {
        console.log("EDITJOIN ENTER!");
      }),
    [EDIT_LIKE]: (state, action) =>
      produce(state, (draft) => {
        console.log("EDITLIKE ENTER!");
      }),
  },
  initialState
);

const actionCreators = {
  addPostDB,
  uploadImageDB,
  getDetailPost,
  getDetailPostDB,
  editJoin,
  joinDB,
  joinCancelDB,
  editLike,
  likeDB,
  dislikeDB,
};

export { actionCreators };
