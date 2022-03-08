import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";

const CompleteConfirm = () => {
  return (
    <React.Fragment>
      <Grid padding="5%" letterSpacing="-0.005rem">
        <Grid padding="6%">
          <div style={{ fontSize: "7.500em" }}>👍</div>
          <Title>목표 인증 완료!</Title>
          <SubTitle>오늘의 도전은 멋진 습관이 될 거예요</SubTitle>

          <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            인증 보상
          </div>
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
          확인
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
export default CompleteConfirm;
