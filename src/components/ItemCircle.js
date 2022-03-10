import React from "react";
import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";

const ItemCircle = () => {
  return (
    <ContainerGrid bg="#f7f7f7">
      <Grid height="40vh" padding="5vh 0 0">
        <ItemContainer>
          <div style={{ background: "#FF954D" }}></div>
          <div style={{ background: "#FFC0C0" }}></div>
          <div style={{ background: "#FFF16C" }}></div>
          <div style={{ background: "#9C9C9C" }}></div>
          <div style={{ background: "#D7C5FF" }}></div>
          <div style={{ background: "#8CD6F4" }}></div>
          <div style={{ background: "#C7FFE0" }}></div>
          <div style={{ background: "#9C9C9C" }}></div>
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
