import axios from "axios";

const instance = axios.create({
  baseURL: "http://서버아이피주소/",
  // timeout: 1000,
  // headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json, text/plain,*/*",
  },
});

// instance.defaults.headers.common["Authorization"] =
//   localStorage.getItem("token")

//  timeout: 180000
//  withCredentials: false
//  headers: {
//    "Content-Type": "application/json"
//    Authorization: `Bearer ${localStorage.getItem("token")}`
//  }

//참고
export const apis = {
  // user.js
  login: (email, password) => instance.post('/api/users/login', { email, password }),
  loginKakao: (email) =>
    instance.post('/api/users/loginKakao', { email }),
  signup: (nickname, email, password, confirmPassword) =>
  instance.post("/api/users/signup", {
    nickname,
    email,
    password,
    confirmPassword,
  }),
  loginCheck: () => instance.get('/api/auth/checkLogin'),

  //이메일 체크
  emailCheck: (email) => instance.post('/api/users/checkEmail', {email}),
  //닉네임 체크
  nicknameCheck: (nickname) => instance.post('/api/users/checkNickname', {nickname})
  // post
  // posts: () => instance.get("/api/posts"),
  // post: (postId) => instance.get(`/api/posts/${postId}`, {}),
  // //
  // add: (data) => instance.post("/api/posts", data),
  // apis.add(data).then
  // delete: (postId) => instance.delete(`/api/posts/${postId}`),
  //   모듈 활용예시)
  //apis.delete(postId).then(function (res) {
  // history.replace('/');
  //     )

  //search
  // wordSearch: (searchWord) => instance.get(`/api/posts?search=${searchWord}`),
};

export default instance;
