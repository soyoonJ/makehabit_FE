import React from "react";

import { Button } from "../elements";

import styled from "styled-components";
import { history } from "../redux/configureStore";

import moment from "moment";

const ConfirmPost = (props) => {
  const { thumbnail, title, round, content, status, startAt, isUpload } = props;

  const now = moment(new Date());
  const day = moment(new Date(startAt));
  const startDate = Math.abs(now.diff(day, "days"));
  let startHour:number = null;
  if (startDate === 0) {
    startHour = Math.abs(now.diff(day, "hour"));
  }

  interface StatusType {
    progress: string;
    buttonText: string;
  }
  const statusText:StatusType[] = [
    { progress: "진행예정", buttonText: `${startDate + 1}일` },
    { progress: "진행예정", buttonText: `${startHour}시간` },
    { progress: "종료", buttonText: "완료된 챌린지입니다." },
    { progress: "", buttonText: "오늘의 인증 성공! 내일도 만나요!" },
  ];

  let statusContent:StatusType = {progress:"", buttonText:""};
  //시작전
  if (status === 1) {
    if (startDate !== 0) {
      statusContent = statusText[0];
    } else {
      statusContent = statusText[1];
    }
  }
  //종료
  else if (status === 2) {
    statusContent = statusText[2];
    // 진행중
  } else if (status === 0 && isUpload) {
    statusContent = statusText[3];
  }

  return (
    <GridBox>
      {status === 2 ? (
        <ImageContainer>
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

      <TextContainer>
        <div style={{ marginBottom: "0.813rem" }}>
          <TextGrid>
            <Title>{title}</Title>

            <Round>
              {status === 1 ? (
                <div style={{ color: "#FF8B37", fontWeight: "600" }}>
                  {statusContent.progress}
                </div>
              ) : (
                <>
                  {status === 0 ? (
                    <>
                      <span style={{ fontWeight: "600" }}>{round}세트</span>{" "}
                      진행중
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </Round>
          </TextGrid>
        </div>
        <div style={{ height: "100%" }}>
          <Content>{content}</Content>
        </div>

        {status === 2 || isUpload ? (
          <Button
            width="100%"
            bg="#ddd"
            color="#9C9C9C"
            padding="0.5rem"
            fontSize="1rem"
            fontWeight="600"
            lineHeight="2.48vh"
            cursor="default"
          >
            {statusContent.buttonText}
          </Button>
        ) : (
          <>
            {status === 1 ? (
              <Button
                bg="#f7f7f7"
                color="#FF8B37"
                width="100%"
                padding="0.5rem"
                fontSize="1rem"
                fontWeight="600"
                lineHeight="2.48vh"
                cursor="default"
              >
                {statusContent.buttonText}{" "}
                <span style={{ color: "#9C9C9C" }}>
                  뒤에 챌린지가 시작됩니다!
                </span>
              </Button>
            ) : (
              <Button
                width="100%"
                bg="#FF8B37"
                padding="0.5rem"
                fontSize="1rem"
                fontWeight="600"
                lineHeight="1.31rem"
                _onClick={() => {
                  history.push(`/confirm/${props.challengeId}`);
                }}
              >
                오늘의 인증하기
              </Button>
            )}
          </>
        )}
      </TextContainer>
    </GridBox>
  );
};

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.46875fr;
  gap: 2.01vh;
  margin: 0 0 4.028vh 0;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 15.4vh;
  min-height: 130px;
  grid-column: 1/2;
  position: relative;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
const Completed = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1/2;
  border-radius: 10px;
  background-color: #000;
  position: absolute;
  opacity: 0.7;

  color: white;
  font-size: 2.13vh;
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
`;
const TextGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  font-size: 2.37vh;
  line-height: 3.1vh;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Round = styled.div`
  font-weight: 600;
  font-size: 1.5vh;
  & > span {
    color: #ff8b37;
  }
  text-align: end;
`;

const Content = styled.div`
  font-size: 0.813rem;
  line-height: 1.219rem;
  font-weight: 400;
  color: #707070;

  width: 100%;

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
export default ConfirmPost;
