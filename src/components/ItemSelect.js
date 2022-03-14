import React from "react";

import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";

import ItemBox from "../components/ItemBox";
import ItemCircle from "../components/ItemCircle";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as characterActions } from "../redux/modules/character";
import Horizontable from "./Horizontable";

const ItemSelect = (props) => {
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
  const itemList = useSelector((state) => state.character.itemList);
  const category = itemList[0]?.category;
  React.useEffect(() => {
    dispatch(characterActions.getItemDB(ItemCategory[clickedCate][1]));
    console.log(
      "실행 되었나?",
      category,
      clickedCate,
      ItemCategory[clickedCate][1]
    );
  }, [clickedCate]);

  return (
    <React.Fragment>
      <Navi>
        <Horizontable>
          <NaviButton>
            {ItemCategory.map((e, i) => (
              <div>
                <button
                  key={i}
                  onClick={() => {
                    changeCate(i);
                  }}
                  style={{
                    color: i === clickedCate ? "#FF8B37" : "#9c9c9c",
                    fontWeight: i === clickedCate ? "700" : "400",
                  }}
                >
                  {e[0]}
                </button>
                {i === clickedCate ? (
                  <hr
                    style={{
                      width: i === 4 ? "8rem" : "5.688rem",
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
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
  height: 1.625rem;
  white-space: nowrap;
  display: flex;
  margin: 1.063rem 0 1.063rem 1.875rem;

  & > div {
    position: relative;

    button {
      width: auto;
      all: unset;
      margin-right: 2.688rem;
      font-size: 1.25rem;
      line-height: 1.625rem;
    }

    hr {
      position: absolute;
      height: 3px;
      background-color: #ff8b37;
      border: none;
      z-index: 10;
      bottom: -1.063rem;
      left: -1.875rem;
      right: -0.813rem;
      margin: 0px;
    }
  }
`;

export default ItemSelect;
