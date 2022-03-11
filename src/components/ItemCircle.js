import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as characterActions } from "../redux/modules/character";

const ItemCircle = () => {
  const dispatch = useDispatch();

  const [item, setItem] = React.useState(null);
  const itemList = useSelector((state) => state.character.itemList);
  console.log("아이템리스트", itemList);

  React.useEffect(() => {
    // console.log("유즈이펙트", item);
    dispatch(characterActions.itemPreview(item));
  }, [item]);

  const color = [
    ["orange", "#FF954D"],
    ["pink", "#FFC0C0"],
    ["yellow", "#FFF16C"],
    ["gray", "#9C9C9C"],
    ["purple", "#D7C5FF"],
    ["blue", "#8CD6F4"],
    ["green", "#C7FFE0"],
    ["gray", "#9C9C9C"],
  ];

  return (
    <ContainerGrid bg="#f7f7f7">
      <Grid height="40vh" padding="5vh 0 0">
        <ItemContainer>
          {color.map((e, i) => (
            <div
              style={{ background: e[1] }}
              key={i}
              onClick={() => {
                setItem(e[0]);
              }}
            />
          ))}

          {/* <div style={{ background: "#FF954D" }}></div>
          <div style={{ background: "#FFC0C0" }}></div>
          <div style={{ background: "#FFF16C" }}></div>
          <div style={{ background: "#9C9C9C" }}></div>
          <div style={{ background: "#D7C5FF" }}></div>
          <div style={{ background: "#8CD6F4" }}></div>
          <div style={{ background: "#C7FFE0" }}></div>
          <div style={{ background: "#9C9C9C" }}></div> */}
        </ItemContainer>
      </Grid>
    </ContainerGrid>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 7vh);
  gap: 4vh 4%;
  justify-items: center;
  align-items: center;

  div {
    width: 7vh;
    height: 7vh;
    border-radius: 50%;
    border: 4px solid #fff;
  }
`;

export default ItemCircle;
