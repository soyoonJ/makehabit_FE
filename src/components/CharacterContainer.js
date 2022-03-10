import React from "react";

import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";

const CharacterContainer = () => {
  const Item = process.env.PUBLIC_URL + "/items";
  return (
    <ContainerGrid padding="5%" position="relative">
      <Point>505050</Point>
      <Img src={Item + "/캐릭터_분홍.png"} alt="캐릭터미리보기"></Img>
      <Button
        bg="#6825D6"
        color="#fff"
        width="30%"
        position="absolute"
        right="0"
        bottom="0"
        margin="0 5% 5% 0"
      >
        구매 및 저장
      </Button>
    </ContainerGrid>
  );
};

const Point = styled.div`
  width: 28%;
  background: #fff;
  text-align: center;
`;

const Img = styled.img`
  width: 100%;
`;
export default CharacterContainer;
