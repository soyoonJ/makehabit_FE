import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import GoBack from "../components/PageBack";

import styled from "styled-components";

import moment from "moment";

import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { BsFillPersonFill } from "react-icons/bs";
const PostDetail = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const nickname = useSelector((state) => state.user.user.nickname);
  const challengeId = props.match.params.id;
  // console.log("POSTEDETAIL:", post);
  //좋아요 버튼 on/off
  let [isLike, setIsLike] = React.useState(false);

  React.useEffect(() => {
    dispatch(userActions.loginCheckDB());
    dispatch(postActions.getDetailPostDB(challengeId));
  }, []);
  // console.log("POSTDTAIL", post.startAt.subString(0, 10));
  // console.log(
  //   moment(post.startAt).utc().format("YYYY.MM.DD"),
  //   moment(post.startAt).day()
  // );
  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];

  //로그인 체크
  const is_login = useSelector((state) => state.user.is_login);
  //찜하기 (좋아요) 기능
  const like = () => {
    if (is_login) {
      dispatch(postActions.likeDB(challengeId));
    } else {
      window.alert("로그인 후 인증 해주세요!");
      history.push("/login");
    }
  };
  //찜하기 해제 기능
  const disLike = () => {
    if (is_login) {
      dispatch(postActions.dislikeDB(challengeId));
    } else {
      window.alert("로그인 후 인증 해주세요!");
      history.push("/login");
    }
  };
  //인증하기 기능
  const confirmPage = () => {
    if (is_login) {
      history.push(`/confirm/${challengeId}`);
    } else {
      window.alert("로그인 후 인증 해주세요!");
      history.push("/login");
    }
  };
  const join = () => {
    if (is_login) {
      dispatch(postActions.joinDB(challengeId));
    } else {
      window.alert("로그인 후 인증 해주세요!");
      history.push("/login");
    }
  };
  return (
    <Grid padding="0 0 50px 0">
      <Grid>
        <GoBack />
        <TitleImage src={post.thumbnail} />
      </Grid>
      <Grid is_flex padding="0 5%">
        <Text>{post.title}</Text>
        {post.isLike ? (
          <FcLike
            color="#000"
            size="25"
            onClick={() => {
              disLike();
            }}
          />
        ) : (
          <FcLikePlaceholder
            color="#000"
            size="25"
            onClick={() => {
              like();
            }}
          />
        )}
      </Grid>
      <Grid padding="0 5%">
        <Text>{post.content}</Text>
      </Grid>
      <Grid is_flex borderBottom="1px solid" alignItems="center">
        <Tag>작심삼일 {post.round}회차</Tag>
        <BsFillPersonFill size={30} />
        <Text>{post.participants}명과 함께 도전중이에요!</Text>
      </Grid>
      <Grid padding="5%">
        <Text>나의 참여도</Text>
        <Text>3번씩 10세트면 한 달 습관 성공! 꾸준히 도전해봐요!</Text>
      </Grid>
      <Grid padding="5%">
        <ColorBox>
          <Text>{}바퀴 진행중</Text>
        </ColorBox>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 기간</Text>
        <Grid is_flex>
          <Text color="#ff8b37">
            {moment(post.startAt).utc().format("YYYY.MM.DD")}(
            {dayArray[moment(post.startAt).day()]})
          </Text>
          <Text>부터</Text>
          <Text color="#ff8b37">
            {moment(post.startAt).add(30, "days").utc().format("YYYY.MM.DD")}(
            {dayArray[moment(post.startAt).add(30, "days").day()]})
          </Text>
          <Text>까지</Text>
        </Grid>
        <Text>3번씩 10세트면 한 달 습관 성공! 꾸준히 도전해봐요!</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증방법</Text>
        <ColorBox>
          <Text>{post.howtoContent}</Text>
        </ColorBox>
      </Grid>
      <Grid>
        {post.isParticipate ? (
          <Join
            onClick={() => {
              confirmPage();
            }}
          >
            인증하기
          </Join>
        ) : (
          <Join
            onClick={() => {
              join();
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
  font-size: 10px;
  padding: 5px 15px;

  background-color: #ff8b37;
  border-radius: 30px;
  //   @media only screen and (max-width: 768px) {
  //     padding: 9px 9px;
  //     font-size: 14px;
  //   }
  cursor: pointer;
  color: #ffffff;
  width: 100px;
  text-align: center;
`;

const Join = styled.button`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  max-width: 420px;
  background-color: #ff8b37;
  color: white;
  border: none;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const ColorBox = styled.div`
  width: 100%;
  height: 40px;
  background-color: #fff1e7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export default PostDetail;
