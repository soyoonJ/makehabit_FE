import React from "react";

import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import moment from "moment";

const Completed = (props) => {
  const page = props.match.params.id;
  const openId = useSelector((state) => state.post.challengeId);
  // console.log("openId", openId);
  const totalCnt = useSelector((state) => state.challenge.totalCnt);

  const location = useLocation();

  const openStartAt = location.state?.openStart;
  const participateStartAt = location.state?.participateStart;
  const participateId = location.state?.challengeId;
  const participateTitle = location.state?.title;
  console.log("participateId", participateId);

  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];

  const openStartDate = moment(openStartAt);
  const openTransformDate = openStartDate.format("YYYY년 MM월 DD일");
  const openTransformDay = dayArray[moment(openStartDate).day()];

  const partStartDate = moment(participateStartAt);
  const partTransformDate = partStartDate.format("YYYY년 MM월 DD일");
  const partTransformDay = dayArray[moment(partStartDate).day()];

  console.log(
    "open시작일자",
    openStartAt,
    openStartDate,
    openTransformDate,
    openTransformDay
  );

  const contents = [
    {
      icon: "👏",
      title: "챌린지 개설을 완료했어요",
      subTitle1: "새로운 습관이 시작되는 곳이군요!",
      subTitle2: "",
      boxTitle: "챌린지 일정",
      buttonText: "챌린지 보러가기",
      // API response 오면 moveTo 넣기
      // 하단 수정 필요
      moveTo: `/challenges/${openId}`,
    },
    {
      icon: "👏",
      title: participateTitle,
      subTitle1: "챌린지에 참여하신 걸 축하해요!",
      subTitle2: "완주까지 함께 도전해봐요.",
      boxTitle: "챌린지 일정",
      buttonText: "챌린지 보러가기",
      moveTo: `/challenges/${participateId}`,
    },
    {
      icon: "👍",
      title: "목표 인증 완료!",
      subTitle1: `${totalCnt}번째 도전`,
      subTitle2: "",
      boxTitle: "인증 보상",
      buttonText: "확인",
      moveTo: "/mychallenge/navi",
    },
  ];

  let content = "";

  if (page === "open") {
    content = contents[0];
  } else if (page === "participate") {
    content = contents[1];
  } else {
    content = contents[2];
  }

  return (
    <React.Fragment>
      <ContainerGrid>
        {/* <TopBox>
          <div>{content.icon}</div>
          <div>{content.title}</div>
          <div>{content.subTitle1}</div>
          <div>{content.subTitle2}</div>
        </TopBox>
        <div
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "0.875rem",
          }}
        >
          {content.boxTitle}
        </div> */}
        {page === "confirm" ? (
          <Grid>
            <TopBox>
              <div>{content.icon}</div>
              <div>{content.title}</div>
              <div style={{ fontWeight: "700" }}>
                <span style={{ color: "#FF8B37" }}>{content.subTitle1}</span>을
                성공했어요.
              </div>
            </TopBox>
            <GiftBox>
              <Content>
                성공보상<span style={{ color: "#FF8B37" }}> 10P</span>
              </Content>
            </GiftBox>

            <Button
              borderRadius="5px"
              border="1px solid #FF8B37"
              height="5vh"
              padding="2.5%"
              color="rgba(255, 139, 55, 1)"
              fontSize="1.125rem"
              fontWeight="600"
              bg="#fff"
              _onClick={() => {
                history.push("/character");
              }}
            >
              포인트로 내 캐릭터 꾸미기
            </Button>
          </Grid>
        ) : (
          <>
            <TopBox>
              <div>{content.icon}</div>
              <div>{content.title}</div>
              <div>{content.subTitle1}</div>
              <div>{content.subTitle2}</div>
            </TopBox>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.875rem",
              }}
            >
              {content.boxTitle}
            </div>
            <InfoBox>
              <InfoText>
                <div>
                  <span style={{ color: "#FF8B37", fontWeight: "bold" }}>
                    {page === "open" ? (
                      <>
                        {openTransformDate} {openTransformDay}요일
                      </>
                    ) : (
                      <>
                        {partTransformDate} {partTransformDay}요일
                      </>
                    )}
                  </span>
                  <span>부터</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>3일씩 10바퀴</span>
                  <span>가 진행 될 예정이에요.</span>
                </div>
                <div>완주하는 그 날까지 힘내요!</div>
              </InfoText>
            </InfoBox>
          </>
        )}
        <Button
          fontSize="1.375rem"
          fontWeight="bold"
          height="4.125rem"
          width="100%"
          margin="17.4vh 0 4.8vh"
          bg="rgba(255, 139, 55, 1)"
          _onClick={() => {
            history.push(content.moveTo);
          }}
        >
          {content.buttonText}
        </Button>
      </ContainerGrid>
    </React.Fragment>
  );
};

const TopBox = styled.div`
  margin: 14.4vh 1.5rem 6.7vh 1.5rem;

  & > div {
    &:nth-child(1) {
      margin-bottom: 1.688rem;
      font-size: 7.5rem;
    }

    &:nth-child(2) {
      font-size: 1.375rem;
      font-weight: bold;
      margin-bottom: 0.75rem;
      text-align: center;
    }

    &:nth-child(3),
    &:nth-child(4) {
      font-size: 1.25rem;
      text-align: center;
    }
  }
`;

// 개설/참여완료 주황색 info 박스
const InfoBox = styled.div`
  width: 100%;
  height: 9.625rem;
  background: #fff1e7;
  border-radius: 5px;
`;
const InfoText = styled.div`
  padding: 1.813rem 8%;
  font-size: 1.25rem;
  letter-spacing: -0.005rem;
  line-height: 1.625rem;

  & > div {
    &:nth-child(1),
    &:nth-child(2) {
      margin-bottom: 0.563rem;
    }
  }
`;

// 인증완료 보상 info 박스
const GiftBox = styled.div`
  width: 100%;
  height: 6.125rem;
  background: #fff1e7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.188rem;
`;
const Content = styled.div`
  font-size: 1.563rem;
  font-weight: bold;
`;
export default Completed;
