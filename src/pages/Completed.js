import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Completed = (props) => {
  const page = props.match.params.id;

  const contents = [
    {
      icon: "👏",
      title: "챌린지 개설을 완료했어요",
      subTitle: "새로운 습관이 시작되는 곳이군요!",
      boxTitle: "챌린지 일정",
      buttonText: "챌린지 보러가기",
    },
    {
      icon: "👏",
      title: "챌린지에 참여했어요!",
      subTitle: "새로운 습관 만들기가 곧 시작됩니다!",
      boxTitle: "챌린지 일정",
      buttonText: "챌린지 보러가기",
    },
    {
      icon: "👍",
      title: "목표 인증 완료!",
      subTitle: "오늘의 도전은 멋진 습관이 될 거예요.",
      boxTitle: "인증 보상",
      buttonText: "확인",
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
      <Grid padding="5%" letterSpacing="-0.005rem">
        <Grid padding="6%">
          <div style={{ fontSize: "7.500em" }}>{content.icon}</div>
          <Title>{content.title}</Title>
          <SubTitle>{content.subTitle}</SubTitle>

          <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {content.boxTitle}
          </div>

          {page === "confirm" ? (
            <Grid>
              <GiftBox>
                <Content>
                  <Num>100</Num>
                  <span style={{ paddingBottom: "2vh" }}>포인트와</span>

                  <Num>100</Num>
                  <span>경험치를 획득했어요!</span>
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
            <InfoBox>
              <InfoText>
                <div>
                  <span style={{ color: "#FF8B37", fontWeight: "bold" }}>
                    2022년 00월 00일 월요일
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
          )}
        </Grid>

        <Button
          fontSize="1.375rem"
          fontWeight="bold"
          height="8vh"
          maxWidth="380px"
          position="absolute"
          bottom="5vh"
          bg="rgba(255, 139, 55, 1)"
          _onClick={() => {
            history.goBack();
          }}
        >
          {content.buttonText}
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const Title = styled.div`
  font-size: 1.375rem;
  font-weight: bold;
`;
const SubTitle = styled.div`
  font-size: 1.25rem;
`;
const GiftBox = styled.div`
  width: 100%;
  height: 15vh;
  background: #fff1e7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 4vh auto;
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 3vh 10%;
`;
const Num = styled.span`
  text-align: right;
  color: #ff8b37;
  padding-right: 17px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 17vh;
  background: #fff1e7;
  border-radius: 5px;
  margin: 0 auto 4vh auto;
`;
const InfoText = styled.div`
  padding: 3vh 8%;
  margin: auto;
  font-size: 1.25rem;
  letter-spacing: -0.005rem;
  line-height: 1.625rem;
`;
export default Completed;
