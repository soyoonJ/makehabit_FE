import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";

const CompleteConfirm = () => {
  return (
    <React.Fragment>
      <Grid padding="16px" position="absolute">
        <Image />
        <Title>목표 인증 완료!</Title>
        <div>오늘의 도전은 멋진 습관이 될 거예요</div>

        <div>인증 보상</div>
        <GiftBox>
          <div>
            <span>100</span>
            <span>포인트와</span>
          </div>
          <div>
            <span>100</span>
            <span>경험치를 획득했어요!</span>
          </div>
        </GiftBox>

        <Button
          borderRadius="5px"
          border="1px solid #FF8B37"
          color="rgba(255, 139, 55, 1)"
          bg="#fff"
          _onClick={() => {
            history.push("/character");
          }}
        >
          포인트로 내 캐릭터 꾸미기
        </Button>

        <Button
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
  //   position: absolute;
`;
const GiftBox = styled.div`
  width: 100%;
  height: 10%;
  background: #fff1e7;
  border-radius: 5px;
`;

export default CompleteConfirm;
