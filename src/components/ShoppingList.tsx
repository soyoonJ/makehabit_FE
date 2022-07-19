import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Grid } from "../elements";

import { actionCreators as characterActions } from "../redux/modules/character";
import GridContainer from "../elements/ContainerGrid";
const ShoppingList = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(characterActions.getItemDB());
  }, []);
  const itemList = useSelector((state) => state.character.itemList);
  //카테고리에 따른 필터

  //   const itemList = useSelector((state) =>
  //     state.character.itemList.filter(
  //       (e, i) => itemList2[i].category === category
  //     )
  //   );
  // console.log("shoppingLis", itemList);
  return (
    <Container>
      <Grid borderTop="3px solid #f7f7f7">
        {itemList?.map((e: any, i: number) => (
          <GridContainer key={e._id}>
            <GridBox>
              <ImageContainer style={{ position: "relative" }}>
                <PostImage src={itemList && itemList[i].itemImgUrl}></PostImage>
              </ImageContainer>
              <ItemName>{itemList && itemList[i].itemName}</ItemName>
              <ItemPrice>
                {itemList && itemList[i].isOwned ? "구매함" : itemList[i].price}
              </ItemPrice>
              <ItemCancel>X</ItemCancel>
            </GridBox>
          </GridContainer>
        ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 48.5vh;
  overflow-y: auto;
`;
const GridBox = styled.div`
  display: grid;
  max-width: 420px;
  grid-template-columns: 3fr 1fr 1fr 0.5fr;
  gap: 4%;
  margin: 5vh 0;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 15vh;
  grid-column: 1/2;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 15vh;
  object-fit: cover;
  border-radius: 10px;
`;
const ItemName = styled.div`
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const ItemPrice = styled.div`
  grid-column: 3/4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const ItemCancel = styled.div`
  grid-column: 4/5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export default ShoppingList;
