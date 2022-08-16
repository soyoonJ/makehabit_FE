// 액션 만들어주는 것들
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from '../../shared/Api';

// actions
const ADD_POST = 'ADD_POST';
// const EDIT_POST = "EDIT_POST";
// const DELETE_POST = "DELETE_POST";
const DETAIL_POST = 'DETAIL_POST';
const IMG_EXIST = 'IMG_EXIST';
//참여하기
const EDIT_JOIN = 'EDIT_JOIN';

//좋아요
const EDIT_LIKE = 'EDIT_LIKE';
const GET_LIKE = 'GET_LIKE';
const ADD_LIKE = 'ADD_LIKE';
const DELETE_LIKE = 'DELTE_LIKE';
const SET_LOAD = 'SET_LOAD';
const LIKE_COLLECT = 'LIKE_COLLECT';

//챌린지수정
const EDIT_POST = 'EDIT_POST';

// const GET_DISLIKE = "GET_DISLIKE";

const addPost = createAction(ADD_POST, (challengeId) => ({ challengeId }));
const imgExist = createAction(IMG_EXIST, (imgExist) => ({ imgExist }));
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

const addLike = createAction(ADD_LIKE, (isLike) => ({ isLike }));
const deleteLike = createAction(DELETE_LIKE, (isLike) => ({ isLike }));
const getLike = createAction(GET_LIKE, (isLike) => ({ isLike }));
const setLoad = createAction(SET_LOAD, (isLoading) => ({ isLoading }));
const likeCollection = createAction(LIKE_COLLECT, (collect) => ({ collect }));

//상세수정
const editPost = createAction(EDIT_POST, (editpost) => ({ editpost }));

// initialState
const initialState = {
	imgExist: false,
	page: null,
	challengId: '',
	post: [],
	isLike: [],
	isUpload: false,
	isLoading: false,
	likeCollection: [],
	editpost: [],
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
		dispatch(setLoad(true));
		apis
			.imageUpload(thumbnail)
			.then(function (response) {
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
						console.log('게시물 등록', response, response.data);
						dispatch(addPost(response.data.challengeId));
						history.push({
							pathname: '/completed/open',
							state: { openStart: startAt },
						});
						dispatch(setLoad(false));
					})
					.catch(function (error) {
						if (
							error.response.data.errorMessage ===
							'더 이상 챌린지를 개설할 수 없습니다.'
						) {
							window.alert('하루에 게시글은 3개까지 작성이 가능합니다.');
						}
					});
			})
			.catch((error) => {
				if (
					error.response.data.message ===
					'10MB 이하의 이미지만 업로드 할 수 있습니다.'
				) {
					window.alert('10MB 이하의 이미지만 업로드 할 수 있습니다.');
				}
			});
	};
};

//이미지 업로드
const uploadImageDB = (challengeId, imgUrl, challengeTitle, comment) => {
	return function (dispatch, useState, { history }) {
		apis
			.confirm(challengeId, imgUrl, challengeTitle, comment)
			.then((response) => {
				// console.log("이미지 업로드");
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};

//상세페이지 불러오기
const getDetailPostDB = (challengeId) => {
	return function (dispatch, getState, { history }) {
		apis
			.detail(challengeId)
			.then((response) => {
				console.log('상세페이지데이더', response, response.data);
				dispatch(getDetailPost(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};

// 페이지 수정하기
const editPostDB = (
	challengeId,
	title,
	category,
	thumbnail,
	startAt,
	content,
	howtoContent
) => {
	return function (dispatch, useState, { history }) {
		// apis
		//   // .imageUpload(thumbnail)

		//   .then(function (response) {
		//     console.log("확인", response);
		console.log(
			'확인',
			challengeId,
			title,
			category,
			thumbnail,
			startAt,
			content,
			howtoContent
		);
		dispatch(setLoad(true));
		apis
			.postedit(
				challengeId,
				title,
				category,
				thumbnail,
				// response.data.imgUrl,
				startAt,
				content,
				howtoContent
			)
			.then((response) => {
				// console.log("게시물 수정", response.date);
				dispatch(editPost(response.data.challengeId));
			})
			.catch(function (error) {
				console.log(error);
			});
		// });
		// .catch((error) => {
		//   console.log(error);
		//   return;
		// });
	};
};

//참여하기
const joinDB = (challengeId) => {
	return function (dispatch, getState, { history }) {
		apis
			.join(challengeId)
			.then((response) => {
				dispatch(editJoin(challengeId, true));
				history.push('/completed/participate');
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
		apis
			.joinCancel(challengeId)
			.then((response) => {
				dispatch(editJoin(challengeId, false));

				window.alert('탈퇴가 완료되었습니다.');
				dispatch(getDetailPostDB(challengeId));
			})
			.catch(function (error) {
				console.log(error);
			});
		// .then(() => {
		//   dispatch(getDetailPostDB(challengeId));
		// });
	};
};

const getLikeDB = () => {
	return function (dispatch, getState, { history }) {
		// console.log("GETLIKEINNNNN");
		apis
			.getLike()
			.then((response) => {
				// console.log("getLike! 성공!", response.data);
				dispatch(likeCollection(response.data));
				dispatch(getLike(response.data.challenges));
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};

//찜하기
const likeDB = (challengeId) => {
	return function (dispatch, getState, { history }) {
		// console.log("좋아요");
		apis
			.like(challengeId)
			.then((response) => {
				dispatch(getLikeDB());
				dispatch(addLike(challengeId));
				// dispatch(getDetailPostDB(challengeId));
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};

//찜하기 취소하기
const dislikeDB = (challengeId) => {
	return function (dispatch, getState, { history }) {
		// console.log("싫어요");
		apis
			.dislike(challengeId)
			.then((response) => {
				// console.log("싫어요");
				dispatch(getLikeDB());
				dispatch(deleteLike(challengeId));
			})
			.catch(function (error) {
				console.log(error);
			});
		// .then(() => {
		//   dispatch(getDetailPostDB(challengeId));
		// });
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
				draft.isUpload = true;
				draft.challengeId = action.payload.challengeId;
			}),
		[DETAIL_POST]: (state, action) =>
			produce(state, (draft) => {
				draft.post = action.payload.post;
				draft.is_loaded = true;
				// draft.post.comments = action.payload.comments;
			}),
		[EDIT_JOIN]: (state, action) => produce(state, (draft) => {}),
		[EDIT_LIKE]: (state, action) => produce(state, (draft) => {}),
		[IMG_EXIST]: (state, action) =>
			produce(state, (draft) => {
				draft.imgExist = action.payload.imgExist;
			}),
		[GET_LIKE]: (state, action) =>
			produce(state, (draft) => {
				// console.log(
				//   "GETLIKE!",
				//   action.payload.isLike.map((e) => e.challengeId)
				// );
				// const likeList = getState().main.category_list.filter(
				//   (e) => e.isLike === true
				// );
				draft.isLike.push(action.payload.isLike.map((e, i) => e.challengeId));
			}),
		[ADD_LIKE]: (state, action) =>
			produce(state, (draft) => {
				// console.log("ADD_LIKE", action.payload.isLike);
				draft.isLike.push(action.payload.isLike);
			}),
		[DELETE_LIKE]: (state, action) =>
			produce(state, (draft) => {
				// console.log("DELETE_LIKE", action.payload.isLike);
				draft.isLike.filter((e) => e.isLike !== action.payload.isLike);
			}),
		[SET_LOAD]: (state, action) =>
			produce(state, (draft) => {
				draft.isLoading = action.payload.isLoading;
			}),
		[LIKE_COLLECT]: (state, action) =>
			produce(state, (draft) => {
				// console.log("I'mmmm INNNNN", action.payload);
				draft.likeCollection = action.payload.collect.challenges;
			}),

		[EDIT_POST]: (state, action) =>
			produce(state, (draft) => {
				// console.log("I'mmmm INNNNN", draft.editpost);
				draft.editpost = action.payload.editpost;
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
	getLikeDB,
	likeDB,
	dislikeDB,
	imgExist,
	setLoad,
	editPostDB,
};

export { actionCreators };
