import React from "react";
import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";

const ItemBox = () => {
  const itemList = useSelector((state) => state.character.itemList);
  console.log("아이템리스트", itemList);

  const Item = process.env.PUBLIC_URL + "/items/small";

  return (
    <ItemContainer>
      {itemList.map((e, i) => (
        <OneItem>
          <div>
            <img src={Item + "/캐릭터_분홍.png"} alt="캐릭터_분홍.png"></img>
          </div>
          <div>{e.price}</div>
        </OneItem>
      ))}
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
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:nth-child(2) {
      font-size: 1.25rem;
      font-weight: 700;
      margin-top: 1rem;
    }
  }

  img {
    height: 100%;
  }
`;
export default ItemBox;
