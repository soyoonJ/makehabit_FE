import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.180.137.157/",
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
  // post
  posts: () => instance.get("/api/posts"),
  post: (postId) => instance.get(`/api/posts/${postId}`, {}),
  //
  add: (data) => instance.post("/api/posts", data),
  // apis.add(data).then
  delete: (postId) => instance.delete(`/api/posts/${postId}`),
  //   모듈 활용예시)
  //apis.delete(postId).then(function (res) {
  // history.replace('/');
  //     )

  //   API 변수값 여러개 예시)
  signup: (nickname, email, password) =>
    instance.post("/api/users/signup", {
      nickname,
      email,
      password,
    }),

  //user
  createUser: (user) => instance.post("/api/user/signup", user),
  createLogin: (user) => instance.post("/api/user/login", user),
  checkToken: () => instance.get("/api/user/me"),

  //search
  wordSearch: (searchWord) => instance.get(`/api/posts?search=${searchWord}`),
};

export default instance;
