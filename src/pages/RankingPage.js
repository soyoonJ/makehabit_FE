import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";

import { ReactComponent as GoBack } from "../img/icon_left.svg";

const RankingPage = () => {
  return (
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
      <MyRanking></MyRanking>
    </ContainerGrid>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const MyRanking = styled.div`
  width: 100%;
  background-color: #ff8b37;
`;

export default RankingPage;
