import React from "react";
import { Grid, Text, Input, Image, Button } from "../elements";

import styled from "styled-components";
import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";

const Recommend = () => {
  return (
    <React.Fragment>
      <Container>
        <Header>
          <Text alignCenter size="20px" bold>
            추천 작심삼일
          </Text>
        </Header>
        <hr></hr>
        <Banner src="imges/banner_02.png" alt=""></Banner>
        <CardWrap>
          <CategoryPost></CategoryPost>
          <CategoryPost></CategoryPost>
        </CardWrap>
        <ButtonNavigation></ButtonNavigation>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  overflow-x: hidden;
  margin: 0% 3% 0% 2%;
`;

const Header = styled.div`
  margin: 3% 0% 2% 0%;
  display: flex;
  justify-content: space-around;
  text-align: center;
`;
//슬라이드 배너 작업
const Banner = styled.img`
  display: block;
  margin: 3% auto 7% auto;
`;

const CardWrap = styled.div`
  display: flex;
  margin: 0% 3% 0% 2%;
  justify-content: space-around;
`;

export default Recommend;
