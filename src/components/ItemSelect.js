import React from "react";

import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";

import ItemBox from "../components/ItemBox";
import ItemCircle from "../components/ItemCircle";

const ItemSelect = () => {
  //   const Item = process.env.PUBLIC_URL + "/items";
  const ItemCategory = ["컬러", "배경", "표정", "의상", "악세사리"];
  const [clickedCate, changeCate] = React.useState(0);

  return (
    <React.Fragment>
      <Navi>
        <NaviButton>
          {ItemCategory.map((e, i) => (
            <button
              key={i}
              onClick={() => {
                changeCate(i);
              }}
            >
              {e}
            </button>
          ))}
        </NaviButton>
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
