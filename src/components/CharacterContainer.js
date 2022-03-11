import React from "react";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as characterActions } from "../redux/modules/character";

const CharacterContainer = () => {
  const dispatch = useDispatch();

  // 여러개 만들어야 하나?
  const preview = useSelector((state) => state.character?.item);
  // console.log("바디 프리뷰", preview);

  // const [body, setBody] = React.useState(사용자초기값)

  // React.useEffect(()=>{
  //   setBody(preview)
  // },[preview])

  const selectedBg = React.useRef();
  const selectedBody = React.useRef();
  const selectedAcc = React.useRef();
  const selectedClothes = React.useRef();
  // console.log(selectedBody.current.alt);

  const sendItems = () => {
    const background = selectedBg.current.alt;
    const body = selectedBody.current.alt;
    const acc = selectedAcc.current.alt;
    const clothes = selectedClothes.current.alt;

    const selectedItems = { body, acc, clothes };
    // dispatch(characterActions.selectedItems(selectedItems))
    // history.push('/장바구니페이지')
  };

  const Item = process.env.PUBLIC_URL + "/items/large";

  return (
    <Container>
      <Point>505050</Point>
      <ImgContainer>
        <ItemImg
          src={Item + "/background_01.png"}
          ref={selectedBg}
          alt="/background_01.png"
        ></ItemImg>
        <ItemImg
          src={Item + "/color_01.png"}
          ref={selectedBody}
          alt="/color_01.png"
        ></ItemImg>
        <ItemImg
          src={Item + "/acc_02.png"}
          ref={selectedAcc}
          alt="/acc_01.png"
        ></ItemImg>
        <ItemImg
          src={Item + "/clothes_02.png"}
          ref={selectedClothes}
          alt="/clothes_02.png"
        ></ItemImg>
      </ImgContainer>
      <Button
        _onClick={sendItems}
        position="absolute"
        bottom="0"
        margin="0 5% 2vh 0"
        bg="#6825D6"
        color="#fff"
        width="7.25rem"
        height="2.5rem"
        lineHeight="1.5rem"
        borderRadius="3.125rem"
        fontSize="1.125rem"
        alignSelf="end"
        fontWeight="600"
        centerFlex
        zIndex="5"
      >
        구매 및 저장
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 48.5vh;
`;
const Point = styled.div`
  position: absolute;
  width: 6.875rem;
  height: 2rem;
  margin: 2.6vh 0 0 5%;
  background: #fff;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 3.125rem;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 48.5vh;
  position: relative;
  display: flex;
  justify-content: center;
`;

const ItemImg = styled.img`
  height: 100%;
  position: absolute;
  z-index: 1;
`;
export default CharacterContainer;
