// 아이템 선택창 - 네모박스
import React from "react";
import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as characterActions } from "../redux/modules/character";

import { useDispatch, useSelector } from "react-redux";
import Horizontable from "./Horizontable";

const ItemBox = () => {
  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.character.itemList);
  const category = itemList[0].category;
  // console.log("아이템리스트", itemList);
  console.log("카테고리", category);

  const [item, setItem] = React.useState(null);

  const Item = process.env.PUBLIC_URL + "/items/small";

  React.useEffect(() => {
    if (category === "background") {
      dispatch(characterActions.backgroundPreview(item));
    } else if (category === "clothes") {
      dispatch(characterActions.clothesPreview(item));
    } else if (category === "acc") {
      dispatch(characterActions.accPreview(item));
    } else if (category === "emotion") {
      dispatch(characterActions.emotionPreview(item));
    }
  }, [item]);

  return (
    <ItemContainer>
      <Horizontable>
        {itemList.map((e, i) => (
          <OneItem key={i}>
            <div>
              <div>
                <img
                  src={Item + itemList[i].itemImgUrl}
                  onClick={() => {
                    setItem(e.itemImgUrl);
                  }}
                  alt={itemList[i].itemImgUrl}
                ></img>
              </div>
              <div>{e.itemName}</div>
              <div>{e.price}</div>
            </div>
          </OneItem>
        ))}
      </Horizontable>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  max-width: 420px;
  height: 44.5vh;
  background: #f7f7f7;
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;

  & > div {
    display: inline-block;
  }
`;

const OneItem = styled.div`
  width: 36%;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  margin: 4vh 3%;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & > div > div {
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
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.5rem;
      color: #707070;
      margin-top: 0.625rem;
    }

    &:nth-child(3) {
      font-size: 1.25rem;
      font-weight: 700;
      margin-top: 0.625rem;
    }
  }

  img {
    height: 100%;
  }
`;
export default ItemBox;
