import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

import { Grid, Text, Input, Button } from "../elements";
import PageBack from "../components/PageBack";

import styled from "styled-components";

import moment from "moment";

import ButtonNavigation from "../components/ButtonNavigation";

import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { BsFillPersonFill } from "react-icons/bs";
const PostDetail = (props) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const nickname = useSelector((state) => state.user.user.nickname);
  const challengeId = props.match.params.id;
  console.log("POSTDETAIL", post);
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
    } else {
    }
  };

  //인증하기 버튼 방어 코드
  const date = new Date(post?.startAt);
  const koStartAt = date.toLocaleString();
  console.log("koStartAt", koStartAt);
  const spiltDate = koStartAt.split(". ");
  const stringDate = `${spiltDate[0]}년 ${spiltDate[1]}월 ${spiltDate[2]}일`;
  // console.log("아이디", challengeId);
  // 버튼 텍스트, 우측 상단 진행상태 텍스트 달기 위한 조건
  const statusText = [
    // { progress: "진행예정", buttonText: `${koStartAt.slice(0, 11)} 시작` },
    { progress: "진행예정", buttonText: `${stringDate} 시작` },
    { progress: "종료", buttonText: "종료된 챌린지" },
    { progress: "", buttonText: "오늘의 인증 성공! 내일도 만나요!" },
  ];

  let statusContent = "";
  //시작전
  if (post.status === 1) {
    statusContent = statusText[0];
  }
  //종료
  else if (post.status === 2) {
    statusContent = statusText[1];
  } else if (post.status === 0 && post.isUpload) {
    statusContent = statusText[2];
  }

  //몇 바퀴인지 표시
  const currentRound = parseInt(post?.proofCount - 1 / 3) + 1;
  const Item = process.env.PUBLIC_URL + "/images";
  return (
    <Grid padding="0 0 50px 0">
      <Grid>
        <PageBack />
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
      <Grid>
        <JoinBox></JoinBox>
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
          <Text>{currentRound}바퀴 진행중</Text>
        </ColorBox>
      </Grid>
      <JoinContainer>
        <JoinBox>
          <Text>{(currentRound - 1) * 3 + 1}번째</Text>
          <Img width="34px" src={Item + "/icon_coin.svg"} />
          <Text>인증 하면 10P</Text>
        </JoinBox>
        <JoinBox>
          <Text>{(currentRound - 1) * 3 + 2}번째</Text>
          <Img width="34px" src={Item + "/icon_coin.svg"} />
          <Text>인증 하면 10P</Text>
        </JoinBox>
        <JoinBox>
          <Text>{(currentRound - 1) * 3 + 3}번째</Text>
          <Img width="34px" src={Item + "/icon_coin.svg"} />
          <Text>인증 하면 10P</Text>
        </JoinBox>
      </JoinContainer>
      <Grid padding="5%">
        <Text>챌린지 기간</Text>
        <Grid is_flex>
          <Text color="#ff8b37">
            {moment(koStartAt, "YYYY.MM.DD").format("YYYY.MM.DD")}(
            {dayArray[moment(koStartAt, "YYYY.MM.DD").day()]})
          </Text>
          <Text>부터</Text>
          <Text color="#ff8b37">
            {moment(koStartAt, "YYYY.MM.DD")
              .add(30, "days")
              .format("YYYY.MM.DD")}
            ({dayArray[moment(koStartAt, "YYYY.MM.DD").add(30, "days").day()]})
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
        {/* 참여 했을때 */}
        {post.isParticipate ? (
          post.status === 1 || post.status === 2 || post.isUpload ? (
            <Button
              width="100%"
              bg="#ddd"
              fontSize="1rem"
              fontWeight="600"
              cursor="default"
            >
              {statusContent.buttonText}
            </Button>
          ) : (
            <Button
              width="100%"
              bg="#FF8B37"
              fontSize="1rem"
              fontWeight="600"
              _onClick={() => {
                confirmPage();
                // history.push(`/confirm/${props.challengeId}`);
              }}
            >
              오늘의 인증하기
            </Button>
          ) // 참여 안했을 때 + 로그인 되어있을 때
        ) : is_login ? (
          <Link
            to={{
              pathname: "/completed/participate",
              state: {
                participateStart: post.startAt,
                challengeId: challengeId,
                title: post.title,
              },
            }}
          >
            <Join
              onClick={() => {
                dispatch(postActions.joinDB(challengeId));
              }}
            >
              참여하기
            </Join>
          </Link>
        ) : (
          // 참여 안했을 때 + 로그인 안되어 있을 때
          <Join
            onClick={() => {
              window.alert("로그인 후 인증 해주세요!");
              history.push("/login");
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
const JoinContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4%;
  margin: 0 20px;
`;

const JoinBox = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 4%;
  // margin: 5vh 0;
  border-radius: 10px;
  background-color: #f7f7f7;
  place-items: center;
  text-align: center;
`;

const Img = styled.img`
  size: 40px;
`;
export default PostDetail;
