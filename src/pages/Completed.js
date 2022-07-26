import React from "react";

import { ContainerGrid, Grid, Button } from "../elements";
import MetaTag from "../shared/MetaTag";

import { history } from "../redux/configureStore";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import moment from "moment";

const Completed = (props) => {
  const page = props.match.params.id;
  const totalCnt = useSelector((state) => state.challenge?.totalCnt);
  const point = useSelector((state) => state.challenge?.point);

  const location = useLocation();

  const openStartAt = location.state?.openStart;
  const participateStartAt = location.state?.participateStart;
  const participateTitle = location.state?.title;

  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];

  const openStartDate = moment(openStartAt);
  const openTransformDate = openStartDate.format("YYYY년 MM월 DD일");
  const openTransformDay = dayArray[moment(openStartDate).day()];

  const partStartDate = moment(participateStartAt);
  const partTransformDate = partStartDate.format("YYYY년 MM월 DD일");
  const partTransformDay = dayArray[moment(partStartDate).day()];

  const contents = [
    {
      title: "챌린지 개설을 완료했어요",
      subTitle1: "새로운 습관이 시작되는 곳이군요!",
      subTitle2: "",
      boxTitle: "챌린지 일정",
      buttonText: "챌린지 보러가기",
      moveTo: "/mychallenge/navi",
      meta: "챌린지 개설 완료",
    },
    {
      title: participateTitle,
      subTitle1: "챌린지에 참여하신 걸 축하해요!",
      subTitle2: "완주까지 함께 도전해봐요.",
      boxTitle: "챌린지 일정",
      buttonText: "챌린지 보러가기",
      moveTo: "/mychallenge/navi",
      meta: "챌린지 참여 완료",
    },
    {
      title: "목표 인증 완료!",
      subTitle1: `${totalCnt}번째 도전`,
      subTitle2: "",
      boxTitle: "인증 보상",
      buttonText: "확인",
      moveTo: "/mychallenge/feed",
      meta: "오늘의 인증 완료",
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
      <MetaTag title={"습관삼끼 | " + content.meta} />

      <ContainerGrid>
        {page === "confirm" ? (
          <Grid>
            <TopBox>
              <div>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/illust_greatjob_samkki.png"
                  }
                  alt="상단 캐릭터 일러스트"
                  style={{ height: "26.77vh" }}
                />
              </div>
              <div>{content.title}</div>
              <div style={{ fontWeight: "700" }}>
                <span style={{ color: "#FF8B37", fontWeight: "700" }}>
                  {content.subTitle1}
                </span>
                을 성공했어요.
              </div>
            </TopBox>

            <GiftBox>
              <Content>
                <img
                  src={process.env.PUBLIC_URL + "/images/icon_coin.svg"}
                  alt="포인트 아이콘"
                  style={{
                    width: "4.02vh",
                    height: "4.02vh",
                    marginRight: "1.89vh",
                  }}
                ></img>
                성공보상
                <span style={{ color: "#FF8B37", fontWeight: "700" }}>
                  &nbsp;{point}P
                </span>
              </Content>
            </GiftBox>

            <Button
              borderRadius="5px"
              border="1px solid #FF8B37"
              height="6.16vh"
              padding="2.5%"
              color="rgba(255, 139, 55, 1)"
              fontSize="2.13vh"
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
              {page === "participate" ? (
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/illust_exercise_samkki.png"
                    }
                    alt="상단 캐릭터 일러스트"
                    style={{ height: "26.77vh" }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/illust_congrate_samkki.png"
                    }
                    alt="상단 캐릭터 일러스트"
                    style={{ height: "30.8vh" }}
                  />
                </div>
              )}
              <div>{content.title}</div>
              <div>{content.subTitle1}</div>
              <div>{content.subTitle2}</div>
            </TopBox>
            <div
              style={{
                fontSize: "2.36vh",
                fontWeight: "bold",
                marginBottom: "2.36vh",
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
                  <span> 부터</span>
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>3일씩 10세트</span>
                  <span>가 진행 될 예정이에요.</span>
                </div>
                <div>완주하는 그 날까지 힘내요!</div>
              </InfoText>
            </InfoBox>
          </>
        )}
        <Button
          position="absolute"
          right="0"
          left="0"
          bottom="0"
          fontSize="2.6vh"
          fontWeight="bold"
          height="7.93vh"
          width="90%"
          maxWidth="380px"
          margin="0 auto 2.36vh auto"
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
  margin: 0 1.5rem 5.56vh 1.5rem;
  padding-top: 8.05vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    &:nth-child(1) {
      margin-bottom: 3.43vh;
    }

    &:nth-child(2) {
      font-size: 2.6vh;
      font-weight: bold;
      margin-bottom: 0.75rem;
      text-align: center;
    }

    &:nth-child(3) {
      font-size: 2.36vh;
      text-align: center;
      margin-bottom: 0.5rem;
    }

    &:nth-child(4) {
      font-size: 2.36vh;
      text-align: center;
    }
  }
`;

const InfoBox = styled.div`
  width: 100%;
  background: #fff1e7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  text-align: left;
`;
const InfoText = styled.div`
  padding: 1.813rem 2.25rem;
  font-size: 2.36vh;
  letter-spacing: -0.5%;
  line-height: 3.31vh;

  & > div {
    &:nth-child(1),
    &:nth-child(2) {
      margin-bottom: 0.7vh;
    }
  }
`;

const GiftBox = styled.div`
  width: 100%;
  background: #fff1e7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.188rem;
`;
const Content = styled.div`
  font-size: 2.96vh;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 3.79vh;
`;
export default Completed;
