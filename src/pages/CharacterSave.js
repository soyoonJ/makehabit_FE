import React from "react";

import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";

const CharacterSave = () => {
  return (
    <React.Fragment>
      <ContainerGrid>
        <TopBox>
          <div>
            <img
              src={
                process.env.PUBLIC_URL + "/images/illust_exercise_samkki.png"
              }
              alt="상단 캐릭터 일러스트"
              style={{ height: "26.77vh" }}
            />
          </div>
          <div>캐릭터 저장 완료!</div>
        </TopBox>

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
            history.push("/mypage");
          }}
        >
          확인
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

// 개설/참여완료 주황색 info 박스
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

// 인증완료 보상 info 박스
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

export default CharacterSave;
