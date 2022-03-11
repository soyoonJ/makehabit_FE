// import React from "react";
// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../../redux/modules/user";
// import { api } from "./OAuth";
// import { setCookie } from "../../shared/token";

// const Kakao = (props) => {
//   const dispatch = useDispatch();
//   const [first, setFirst] = React.useState(false);
//   let authorization_code = new URL(window.location.href).searchParams.get(
//     "code"
//   );

//   //kakao social 로그인
//   const kakaoLogin = (authorization_code) => {
//     return async function (dispatch, getState, { history }) {
//       console.log("I'mINNNNNNN");
//       await api
//         .get(`/api/users/kakao/callback?code=${authorization_code}`)
//         .then((response) => {
//           const token = response.data.user.token;
//           const userNick = response.data.user.nick;
//           setCookie("login", token);
//           localStorage.setItem("nick", `${userNick}`);
//         })
//         .then(() => {
//           const defaultNick = localStorage.getItem("nick");
//           const distriNick = defaultNick.indexOf("164", 0);
//           if (distriNick == -1) {
//             setFirst(false);
//             history.push("/");
//           } else {
//             setFirst(true);
//           }
//         })
//         .catch((err) => {
//           console.log("카카오 로그인실패", err);
//         });
//     };
//   };

//   React.useEffect(() => {
//     //kakao 인가코드 백으로 넘기기
//     console.log("I'm INNNNN");
//     dispatch(kakaoLogin(authorization_code));
//   }, []);

//   // return <>{first ? <SocialInfoSet /> : ""}</>;
// };
// export default Kakao;
