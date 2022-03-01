// 내 챌린지 이름 바뀌면 파일명도 바꾸기
import React from "react";

import { Grid, Text, Input, Image } from "../elements";
import ConfirmPost from "../components/ConfirmPost";

import styled from "styled-components";

const MyChallenge = () => {
  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>작심삼일 인증</div>
      <hr />
      <Container>
        <Grid>내가 참여한 챌린지</Grid>
        <Grid>나의 기록보기</Grid>
      </Container>

      <ConfirmPost />
      <ConfirmPost />
      <ConfirmPost />

      <Grid padding="16px" is_flex>
        <Image shape="ConfirmHistory" />
        <Image shape="ConfirmHistory" />
        <Image shape="ConfirmHistory" />
        <Image shape="ConfirmHistory" />
      </Grid>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

export default MyChallenge;
