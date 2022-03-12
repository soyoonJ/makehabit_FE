//Auth.js

//카카오 로그인
const CLIENT_ID = "15e5e13769ba7b73152744d46e3514b7";
// const CLIENT_ID = "97015ab35432c8e756ec1cc664c2ea18";
//REDIRECT_URI 주소 백엔드랑 주소일치시키기
// const REDIRECT_URI = "http://52.79.227.179/api/users/kakao/callback";
const REDIRECT_URI = "http://localhost:3000/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
