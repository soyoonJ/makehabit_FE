import axios from "axios";

const instance = axios.create({
  // baseURL: "http://52.79.227.179/",
  baseURL: "https://makehabitapi.shop/",
  // timeout: 5000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json, text/plain,*/*",
  },
});
instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// instance token refresh
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error", error.config, error.response);
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 401) {
      console.log("401error", config);
      const refreshToken = `Bearer ${localStorage.getItem("token")}`;

      originalRequest.headers = { Authorization: refreshToken };
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

//참고
//user.js ------------------------------------------------------------------------------------------------------------------------------------------
export const apis = {
  login: (email, password) =>
    instance.post("/api/users/login", { email, password }),
  loginKakao: (email) => instance.post("/api/users/loginKakao", { email }),
  signup: (email, nickname, password, confirmPassword) =>
    instance.post("/api/users/signup", {
      email,
      nickname,
      password,
      confirmPassword,
    }),

  emailCheck: (email) => instance.post("/api/users/checkEmail", { email }),
  nicknameCheck: (nickname) =>
    instance.post("/api/users/checkNickname", { nickname }),

  login: (email, password) =>
    instance.post("/api/users/login", { email, password }),
  loginKakao: () => instance.get("/api/users/kakao"),
  loginCheck: () => instance.get("/api/users/checkLogin"),

  // 메인 -------------------------------------------------------------------------------------------------------

  mainSearch: (searchWord) => instance.get(`/api/search?title=${searchWord}`),
  // 메인-추천작심삼일
  // ()안에는 변수로 받아오는 값이 있을 때 추가! (위에꺼 참고하기)
  // "length=3" 이부분은 메인에서 swap 넘길 때의 갯수인지 백분들과 확인
  mainRecommend: (recommendLength) =>
    instance.get(`api/main/recommendation?length=${recommendLength}`),

  // 카테고리 -------------------------------------------------------------------------------------------------------

  category: (categoryId) => instance.get(`/api/category/${categoryId}`),
  maincategory: (recommendLength, categoryId) =>
    instance.get(`/api/category/${categoryId}?length=${recommendLength}`),

  // 작성페이지 -------------------------------------------------------------------------------------------------------
  createChallenge: (
    title,
    category,
    thumbnail,
    startAt,
    content,
    howtoContent,
    tag
  ) =>
    instance.post(`/api/challenges`, {
      title,
      category,
      thumbnail,
      startAt,
      content,
      howtoContent,
      tag,
    }),

  imageUpload: (image) => instance.post("/api/image", image),

  // 상세페이지 -------------------------------------------------------------------------------------------------------
  detail: (challengId) => instance.get(`/api/challenges/${challengId}`),
  join: (challengId) => instance.post(`/api/challenges/${challengId}/join`),
  joinCancel: (challengId) =>
    instance.delete(`/api/challenges/${challengId}/join`),
  getLike: () => instance.get("/api/mypage/like"),
  like: (challengeId) => instance.post(`/api/challenges/${challengeId}/like`),
  dislike: (challengeId) =>
    instance.delete(`/api/challenges/${challengeId}/like`),

  postedit: (
    challengId,
    title,
    category,
    thumbnail,
    startAt,
    content,
    howtoContent
  ) =>
    instance.put(`/api/challenges/${challengId}`, {
      title,
      category,
      thumbnail,
      startAt,
      content,
      howtoContent,
    }),

  // 인증페이지 -------------------------------------------------------------------------------------------------------
  getConfirm: (challengeId) =>
    instance.get(`/api/proofshot/${challengeId}/auth`),
  confirm: (challengeId, imgUrl, challengeTitle, comment) =>
    instance.post(`/api/proofshot/${challengeId}/proof`, {
      imgUrl,
      challengeTitle,
      comment,
    }),

  // 챌린지 전체 보기 -------------------------------------------------------------------------------------------------------
  naviChallenge: () => instance.get("/api/mypage/challenge"),
  myChallenge: () => instance.get("/api/mypage/proofShot"),
  oneFeed: (proofShotId) =>
    instance.get(`/api/mypage/proofShot/${proofShotId}`),
  changeFeed: (proofShotId, comment) =>
    instance.patch(`/api/proofshot/${proofShotId}`, { comment }),
  challengeFilter: (status) =>
    instance.get(`/api/mypage/mychallenge/${status}`),

  // 마이페이지 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  mypageCharacter: () => instance.get("/api/mypage/character"),
  mypageUserInfo: () => instance.get("/api/mypage/userinfo"),

  //캐릭터 샵 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  getItemList: () => instance.get("/api/character"),
  GetItemList: () => instance.get("/api/character"),
  PurchaseItem: (totalPrice, items) =>
    instance.post(`/api/character`, { totalPrice, items }),

  // 랭킹페이지 --------------------------------------------------------------------
  GetRanking: (length) =>
    instance.get(`/api/users/callUserRanking?length=${length}`),
};

export default instance;
