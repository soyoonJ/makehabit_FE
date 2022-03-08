import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import GoBack from "../components/GoBack";

import styled from "styled-components";

import { FcLikePlaceholder, FcLike } from "react-icons/fc";
const PostDetail = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const nickname = useSelector((state) => state.user.user.nickname);
  const challengeId = props.match.params.id;
  console.log("POSTEDETAIL:", nickname, challengeId);
  //좋아요 버튼 on/off
  let [isLike, setIsLike] = React.useState(false);

  React.useEffect(() => {
    dispatch(userActions.loginCheckDB());
    dispatch(postActions.getDetailPostDB(challengeId));
  }, []);

  return (
    <Grid padding="0 0 50px 0">
      <Grid>
        <GoBack />

        <TitleImage src={post.thumbnail} />
      </Grid>
      <Grid is_flex padding="5%" borderBottom="1px solid">
        <Text>{post.title}</Text>
        {post.isLike ? (
          <FcLike
            color="#000"
            size="25"
            onClick={() => {
              dispatch(postActions.dislikeDB(challengeId));
            }}
          />
        ) : (
          <FcLikePlaceholder
            color="#000"
            size="25"
            onClick={() => {
              dispatch(postActions.likeDB(challengeId));
            }}
          />
        )}
      </Grid>
      <Grid is_flex>
        <Tag>작심삼일 {post.round}회차</Tag>
        <Text>{post.participants}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>이런 챌린지에요</Text>
        <Text>{post.content}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 진행</Text>
        <Text>{post.startAt}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <Text>{post.howtoContent}</Text>
      </Grid>
      <Grid>
        {post.isParticipate ? (
          <Join
            onClick={() => {
              dispatch(postActions.joinCancelDB(challengeId));
            }}
          >
            참여대기중
          </Join>
        ) : (
          <Join
            onClick={() => {
              dispatch(postActions.joinDB(challengeId));
            }}
          >
            참여하기
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
