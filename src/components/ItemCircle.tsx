import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { ContainerGrid, Grid } from "../elements";
import { actionCreators as characterActions } from "../redux/modules/character";

const ItemCircle = () => {
  const dispatch = useDispatch();

  const itemList = useSelector((state:any) => state.character.itemList);
  const category = itemList[0]?.category;

  const isEquipAll = useSelector((state:any) => state.character?.isEquip);
  const isEquip = isEquipAll?.find((e) => e.category === category);

  const previewColor = useSelector((state:any) => state.character?.colorItem);
  const isReset = useSelector((state:any) => state.character.isReset);

  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    if (category) {
      if (previewColor === null) {
        setItem(isEquip?.itemImgUrl);
      } else {
        setItem(previewColor);
      }
    }
  }, [category, isReset]);

  React.useEffect(() => {
    if (category === "color") {
      dispatch(characterActions.colorPreview(item));
    }
  }, [item]);

  const color = [
    ["/color_00.webp", "#FF954D"],
    ["/color_01.webp", "#FFF16C"],
    ["/color_02.webp", "#FFC0C0"],
    ["/color_03.webp", "#FF6666"],
    ["/color_04.webp", "#C7FFE0"],
    ["/color_05.webp", "#CAEF9A"],
    ["/color_06.webp", "#8CD6F4"],
    ["/color_07.webp", "#D7C5FF"],
  ];

  return (
    <ContainerGrid bg="#f7f7f7">
      <Grid height="40vh" padding="6.16vh 0 0">
        <ItemContainer>
          {color.map((e, i) => (
            <div
              id="multiBorder"
              style={{
                background: e[1],
                boxShadow:
                  e[0] === item
                    ? "0 0 0 4px #fff, 0 0 0 8px #6825D6"
                    : "0 0 0 4px #fff, 0 0 0 8px #f7f7f7",
              }}
              key={i}
              onClick={() => {
                setItem(e[0]);
              }}
            />
          ))}
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
  gap: 5.21vh 4%;
  justify-items: center;
  align-items: center;

  div {
    width: 7.34vh;
    height: 7.34vh;
    border-radius: 50%;
    position: relative;
    z-index: 1;
  }
`;

export default ItemCircle;
