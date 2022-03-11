import React from "react";

import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";

import ItemBox from "../components/ItemBox";
import ItemCircle from "../components/ItemCircle";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as characterActions } from "../redux/modules/character";
import Horizontable from "./Horizontable";

const ItemSelect = () => {
  const dispatch = useDispatch();
  //   const Item = process.env.PUBLIC_URL + "/items";
  const ItemCategory = [
    ["컬러", "color"],
    ["배경", "background"],
    ["표정", "emotion"],
    ["의상", "clothes"],
    ["악세사리", "acc"],
    // ["기타", "기타"],
  ];
  const [clickedCate, changeCate] = React.useState(0);

  React.useEffect(() => {
    // dispatch(characterActions.getItemDB(ItemCategory[clickedCate][1]));
    dispatch(characterActions.getItemDB(ItemCategory[clickedCate][1]));
  }, [clickedCate]);

  return (
    <React.Fragment>
      <Navi>
        <Horizontable>
          <NaviButton>
            {ItemCategory.map((e, i) => (
              <button
                key={i}
                onClick={() => {
                  changeCate(i);
                }}
              >
                {e[0]}
              </button>
            ))}
          </NaviButton>
        </Horizontable>
      </Navi>
      {/* 동그라미 */}
      {clickedCate === 0 ? <ItemCircle /> : <ItemBox />}
      {/* 아이템 */}
    </React.Fragment>
  );
};

const Navi = styled.div`
  border-bottom: 1.5px solid #e0e0e0;
`;

const NaviButton = styled.div`
  height: 3.813rem;
  white-space: nowrap;
  display: flex;

  button {
    width: auto;
    all: unset;
    margin: 0 5.5%;
    font-size: 1.25rem;
    font-weight: 400;
    // font-weight: 700;
    color: #9c9c9c;
  }
`;

export default ItemSelect;
