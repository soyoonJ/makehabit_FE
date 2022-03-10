import React from "react";

import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";

const ItemSelect = () => {
  const Item = process.env.PUBLIC_URL + "/items";
  return (
    <React.Fragment>
      <Navi>
        <naviButton>컬러</naviButton>
        <naviButton>컬러</naviButton>
        <naviButton>컬러</naviButton>
        <naviButton>컬러</naviButton>
        <naviButton>컬러</naviButton>
        {/* <img src={Item + "/캐릭터_분홍.png"} alt="body"></img> */}
      </Navi>
      {/* 동그라미 */}
      <ContainerGrid bg="#f7f7f7">
        <ItemBox></ItemBox>
      </ContainerGrid>
      {/* 아이템 */}
    </React.Fragment>
  );
};

const Navi = styled.div`
  width: 100%;
  height: 7v;
`;
const naviButton = styled.button`
  border: none;
`;
const ItemBox = styled.div`
  width: 100%;
  height: 44.5vh;
`;

export default ItemSelect;
