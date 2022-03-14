import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";

import moment from "moment";

const ConfirmPost = (props) => {
  // console.log("챌린지리스트", props);
  const dispatch = useDispatch();
  const { thumbnail, title, round, content, status, startAt, isUpload } = props;
  const date = new Date(startAt);
  const koStartAt = date.toLocaleString();
  // console.log("koStartAt", koStartAt);
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
  if (status === 1) {
    statusContent = statusText[0];
  } else if (status === 2) {
    statusContent = statusText[1];
  } else if (status === 0 && isUpload) {
    statusContent = statusText[2];
  }

  return (
    <GridBox>
      {/* 좌측 이미지 - 완료된 챌린지 */}
      {status === 2 ? (
        <ImageContainer style={{ position: "relative" }}>
          <Completed>완료</Completed>
          <PostImage
            src={thumbnail}
            onClick={() => {
              history.push(`/challenges/${props.challengeId}`);
            }}
          ></PostImage>
        </ImageContainer>
      ) : (
        <ImageContainer>
          <PostImage
            src={thumbnail}
            onClick={() => {
              history.push(`/challenges/${props.challengeId}`);
            }}
          ></PostImage>
        </ImageContainer>
      )}

      {/* 우측 텍스트 부분 */}
      <TextContainer>
        <div>
          <Title>{title}</Title>

          <Round>
            {/* 진행예정인 챌린지 */}
            {status === 1 || status === 2 ? (
              <div>{statusContent.progress}</div>
            ) : (
              <>
                <span>{round}세트</span> 진행중
              </>
            )}
          </Round>
        </div>
        <Content
          style={{ color: "#707070", fontSize: "0.8rem", lineHeight: "150%" }}
        >
          {content}
        </Content>

        {status === 1 || status === 2 || isUpload ? (
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
              history.push(`/confirm/${props.challengeId}`);
            }}
          >
            오늘의 인증하기
          </Button>
        )}
      </TextContainer>
    </GridBox>
  );
};

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4%;
  margin: 5vh 0;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 15vh;
  grid-column: 1/2;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 15vh;
  object-fit: cover;
  border-radius: 10px;
`;
const Completed = styled.div`
  width: 100%;
  height: 15vh;
  grid-column: 1/2;
  border-radius: 10px;
  background-color: #000;
  position: absolute;
  opacity: 0.7;

  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Round = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  & > span {
    color: #ff8b37;
  }
`;

const Content = styled.div`
  // display: -webkit-box;
  // display: block;
  // width: 250px;
  // word-wrap: break-word;
  // line-height: 1.2em;
  // height: 3.6em;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // text-align: left;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em;
  max-height: 2.4em;
`;
export default ConfirmPost;
