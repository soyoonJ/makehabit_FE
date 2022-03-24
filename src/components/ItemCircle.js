import React from "react";
import styled from "styled-components";
// import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { ContainerGrid, Grid } from "../elements";
import { actionCreators as characterActions } from "../redux/modules/character";

const ItemCircle = () => {
  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.character.itemList);
  const category = itemList[0]?.category;
  // console.log("카테고리", category);

  const isEquipAll = useSelector((state) => state.character?.isEquip);
  // console.log("컬러리스트", isEquipAll);
  const isEquip = isEquipAll?.find((e) => e.category === category);
  // console.log("컬러", isEquip);

  // const preview = useSelector((state) => state.character);
  const previewColor = useSelector((state) => state.character?.colorItem);
  // console.log("프리뷰컬러", previewColor);

  const [item, setItem] = React.useState(null);
  // console.log("아이템리스트", itemList);

  React.useEffect(() => {
    if (category) {
      if (previewColor === null) {
        setItem(isEquip?.itemImgUrl);
      } else {
        setItem(previewColor);
      }
    }
  }, [category]);

  React.useEffect(() => {
    // console.log("유즈이펙트", item);
    if (category === "color") {
      dispatch(characterActions.colorPreview(item));
    }
  }, [item]);

  const color = [
    ["/color_00.png", "#FF954D"],
    ["/color_01.png", "#FFF16C"],
    ["/color_02.png", "#FFC0C0"],
    ["/color_03.png", "#FF6666"],
    ["/color_04.png", "#C7FFE0"],
    ["/color_05.png", "#CAEF9A"],
    ["/color_06.png", "#8CD6F4"],
    ["/color_07.png", "#D7C5FF"],
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
