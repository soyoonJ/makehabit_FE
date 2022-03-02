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
          <Img
            src="https://news.imaeil.com/photos/2018/11/04/2018110420391224907_m.jpg"
            alt=""
            onClick={() => {
              history.push("/myfeed/:id");
            }}
          ></Img>
          <Img
            src="https://news.imaeil.com/photos/2018/11/04/2018110420391224907_m.jpg"
            alt=""
            onClick={() => {
              history.push("/myfeed/:id");
            }}
          ></Img>
          <Img
            src="https://news.imaeil.com/photos/2018/11/04/2018110420391224907_m.jpg"
            alt=""
            onClick={() => {
              history.push("/myfeed/:id");
            }}
          ></Img>
          <Img
            src="https://news.imaeil.com/photos/2018/11/04/2018110420391224907_m.jpg"
            alt=""
            onClick={() => {
              history.push("/myfeed/:id");
            }}
          ></Img>
          <Img
            src="https://news.imaeil.com/photos/2018/11/04/2018110420391224907_m.jpg"
            alt=""
            onClick={() => {
              history.push("/myfeed/:id");
            }}
          ></Img>
        </ImageContainer>
      )}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 16px;
`;

const Img = styled.img`
  width: 90%;
  height: 90%;
  padding: 8px;
  cursor: pointer;
`;

export default MyChallenge;
