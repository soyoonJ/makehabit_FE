// 내 챌린지 이름 바뀌면 파일명도 바꾸기
import React from "react";

import { Grid, Text, Input, Image } from "../elements";
import ConfirmPost from "../components/ConfirmPost";
import { history } from "../redux/configureStore";

import styled from "styled-components";

const MyChallenge = () => {
  const [defaultTab, setTab] = React.useState(false);

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>작심삼일 인증</div>
      <hr />

      <Container>
        <Grid
          pointer
          _onClick={() => {
            setTab(true);
          }}
        >
          내가 참여한 챌린지
        </Grid>
        <Grid
          pointer
          _onClick={() => {
            setTab(false);
          }}
        >
          나의 기록보기
        </Grid>
      </Container>

      {defaultTab ? (
        <div>
          <ConfirmPost />
          <ConfirmPost />
          <ConfirmPost />
        </div>
      ) : (
        <ImageContainer>
          <Image
            width="50%"
            _onClick={() => {
              // feed 아이디로 들어갈 수 있게 해줘야 함
              history.replace("/myfeed");
            }}
            shape="ConfirmHistory"
          />
          <Image shape="ConfirmHistory" />
          <Image shape="ConfirmHistory" />
          <Image shape="ConfirmHistory" />
        </ImageContainer>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-count: 2;
`;

export default MyChallenge;
