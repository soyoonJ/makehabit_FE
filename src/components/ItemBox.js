import React from "react";
import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";

const ItemBox = () => {
  return (
    <ItemContainer>
      <OneItem>
        <div></div>
        <div>100</div>
      </OneItem>
      <OneItem>
        <div></div>
        <div>100</div>
      </OneItem>
      <OneItem>
        <div></div>
        <div>100</div>
      </OneItem>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  height: 44.5vh;
  background: #f7f7f7;
  display: flex;
`;

const OneItem = styled.div`
  width: 100%;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4vh 3%;

  div {
    &:nth-child(1) {
      // 자물쇠 아이콘 대비 - relative
      position: relative;
      width: 100%;
      height: 19vh;
      background: #fff;
      border-radius: 10px;
    }

    &:nth-child(2) {
      font-size: 1.25rem;
      font-weight: 700;
      margin-top: 1rem;
    }
  }
`;
export default ItemBox;
