import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.REACT_APP_API_URL;
const _KAKAO_ID = "15e5e13769ba7b73152744d46e3514b7";
const _KAKAO_REDIRECT_URI = "//52.79.227.179/api/users/kakao/callback";
// const _KAKAO_REDIRECT_URI = "http://localhost:3000/api/users/kakao/callback";

export const api = axios.create({
  baseURL: url,
});

//kakao social login 인가코드 받기

const KAKAO_ID = _KAKAO_ID;
//const KAKAO_REDIRECT_URI="http://localhost:3000/api/v1/auth/kakao/callback";
const KAKAO_REDIRECT_URI = _KAKAO_REDIRECT_URI;

export const KAKAO_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
