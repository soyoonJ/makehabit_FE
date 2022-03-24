import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";

import { ReactComponent as GoBack } from "../img/icon_left.svg";

const Icons = process.env.PUBLIC_URL + "/images/192x192.png";

const RankingPage = () => {
  return (
    <Container>
      <ContainerGrid>
        <Header>
          <GoBack
            style={{
              margin: "auto",
              fill: "#707070",
            }}
            onClick={() => {
              history.push("/");
            }}
          />
          <Text alignCenter size="22px" bold>
            습관삼끼 랭킹
          </Text>
        </Header>
      </ContainerGrid>
      <MyRanking>
        <MyRankingNumber>4</MyRankingNumber>
        <Profile src="images/test.png" />
        <Nickname>나의닉네임입니다</Nickname>
        <Round>100번</Round>
      </MyRanking>
      <ContainerGrid>
        <Text size="13px" color="#707070" margin="14px 20px 0px 0px" alignRight>
          2022.02.02.00시 업데이트
        </Text>

        <RankingWrap>
          <Ranking01>
            <Medal src="images/icon_1st.png" />
            <img src="images/test.png" />
          </Ranking01>
        </RankingWrap>
      </ContainerGrid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const MyRanking = styled.div`
  display: flex;
  width: 100%;
  height: 9vh;
  background-color: #ff8b37;
`;

const MyRankingNumber = styled.text`
  color: white;
  font-size: 18px;
  margin: 25px 25px 28px 25px;
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  margin: 12px 18px 28px 0px;
`;

const Nickname = styled.text`
  color: white;
  font-size: 18px;
  margin: 25px 0px 28px 20px;
`;

const Round = styled.text`
  color: white;
  font-size: 18px;
  margin: 25px 0px 28px 30px;
  align-items: flex-end;
`;

const RankingWrap = styled.div`
  background-color: beige;
  margin-top: 8px;
  height: 388px;
`;

const Ranking01 = styled.div`
  border-radius: 20px;
  margin-top: 21px;
  position: absolute;
`;

const Medal = styled.img`
  z-index: 99;
  position: relative;
  left: 35px;
  top: -85px;
`;

export default RankingPage;
