import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

import GoBack from "../components/GoBack";

import styled from "styled-components";

import { FcLikePlaceholder, FcLike } from "react-icons/fc";
const PostDetail = () => {
  const dispatch = useDispatch();

  //좋아요 버튼 on/off
  let [isLike, setIsLike] = React.useState(false);

  const clickLike = () => {
    // 로그인 유저가 아닌 경우 참여하기 불가
    // if (loginUser === null) {
    //   window.alert(
    //     '회원이 아닌 경우, 참여하기가 불가능합니다. 로그인 해주세요~!'
    //   );
    //   history.replace('/login');
    //   return;
    // }

    // 클릭시 isLike여부 토글 트루일때 좋아요취소_삭제
    setIsLike(!isLike);
    if (isLike) {
      // dispatch(postActions.deleteLikeDB(postId));
    } else {
      // dispatch(postActions.addLikeDB(postId));
    }
  };

  //참여 버튼 on/off
  let [isJoin, setIsJoin] = React.useState(false);

  const clickJoin = () => {
    // 로그인 유저가 아닌 경우 참여하기 불가
    // if (loginUser === null) {
    //   window.alert(
    //     '회원이 아닌 경우, 참여하기가 불가능합니다. 로그인 해주세요~!'
    //   );
    //   history.replace('/login');
    //   return;
    // }

    // 클릭시 isLike여부 토글 트루일때 좋아요취소_삭제
    setIsJoin(!isJoin);
    if (isJoin) {
      // dispatch(postActions.deleteLikeDB(postId));
    } else {
      // dispatch(postActions.addLikeDB(postId));
    }
  };
  return (
    <Grid padding="0 0 50px 0">
      <Grid>
        <GoBack />

        <TitleImage src="https://cdn.mindgil.com/news/photo/202004/69099_2922_1716.jpg" />
      </Grid>
      <Grid is_flex padding="5%" borderBottom="1px solid">
        <Text>매일 3시간 공부</Text>
        {isLike ? (
          <FcLike
            color="#000"
            size="25"
            onClick={() => {
              clickLike();
              dispatch(postActions.dislikeDB());
            }}
          />
        ) : (
          <FcLikePlaceholder
            color="#000"
            size="25"
            onClick={() => {
              clickLike();
              dispatch(postActions.likeDB());
            }}
          />
        )}
      </Grid>
      <Grid is_flex>
        <Tag>작심삼일 1회차</Tag>
        <Text>10명</Text>
      </Grid>
      <Grid padding="5%">
        <Text>이런 챌린지에요</Text>
        <Text>매일 3시간 공부해서 갓생을 살아봅시다.</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 진행</Text>
        <Text>0월 0일부터 진행</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>사진을 업로드 하세요</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>사진을 업로드 하세요</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>사진을 업로드 하세요</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>사진을 업로드 하세요</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>사진을 업로드 하세요</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>사진을 업로드 하세요</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>사진을 업로드 하세요</Text>
      </Grid>
      <Grid>
        <Button is_float>+</Button>
      </Grid>
      <Grid>
        {isJoin ? (
          <Join
            onClick={() => {
              clickJoin();
              dispatch(postActions.joinDB());
            }}
          >
            참여하기
          </Join>
        ) : (
          <Join
            onClick={() => {
              clickJoin();
              dispatch(postActions.joinCancelDB());
            }}
          >
            참여대기중
          </Join>
        )}
      </Grid>
    </Grid>
  );
};

const TitleImage = styled.img`
  width: 100%;
  height: 30vh;
`;

const Tag = styled.p`
  margin: 10px;
  font-size: 17px;
  padding: 5px 15px;

  background-color: #303030;
  border-radius: 30px;
  //   @media only screen and (max-width: 768px) {
  //     padding: 9px 9px;
  //     font-size: 14px;
  //   }
  cursor: pointer;
  color: #ffffff;
  width: 180px;
  text-align: center;
`;

const Join = styled.button`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  max-width: 420px;
  background-color: #ddd;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export default PostDetail;
