import React, { useRef, useState } from "react";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as characterActions } from "../redux/modules/character";

import ShoppingBasket1 from "../components/ShoppingBasket1";

const CharacterContainer = () => {
  const dispatch = useDispatch();

  const Item = process.env.PUBLIC_URL + "/items/large";

  const currentPoint = useSelector((state) => state.character.currentPoint);

  const isEquip = useSelector((state) => state.character?.isEquip);
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");
  // console.log("isEquip", isEquip);
  console.log(
    "equip확인",
    isEquip,
    equipAcc?.itemImgUrl,
    equipBg?.itemImgUrl,
    equipClothes?.itemImgUrl,
    equipColor?.itemImgUrl
  );

  // 여러개 만들어야 하나?
  const preview = useSelector((state) => state.character);
  const previewBg = useSelector((state) => state.character?.backgroundItem);
  const previewColor = useSelector((state) => state.character?.colorItem);
  const previewClothes = useSelector((state) => state.character?.clothesItem);
  const previewAcc = useSelector((state) => state.character?.accItem);

  // console.log("프리뷰", previewBg);
  // console.log("프리뷰", previewColor);
  // console.log("프리뷰", previewClothes);
  // console.log("프리뷰", previewAcc);
  //Item 변경 할때 사용 하는 useState
  const [viewBg, setBg] = useState();
  const [viewBody, setBody] = useState();
  const [viewClothes, setClothes] = useState();
  const [viewAcc, setAcc] = useState();
  // const [viewEmotion, setEmotion] = useState();
  // console.log("뷰", viewBg);
  // console.log("뷰", viewBody);
  // console.log("뷰", viewClothes);
  // console.log("뷰", viewAcc);

  // console.log("뷰", viewBg);
  // console.log("뷰", viewBody);
  // console.log("뷰", viewClothes);
  // console.log("뷰", viewAcc);

  // console.log("데이터?", viewBg, viewBody, viewClothes, viewAcc);

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
    const clothes = selectedClothes.current.alt;
    const acc = selectedAcc.current.alt; //
    const selectedItems = { background, body, clothes, acc };
    console.log("구매및저장아이템", selectedItems);
    // dispatch(characterActions.selectedItems(selectedItems));
    // 모달로 데이터 넘겨주기
  };

  //자식 함수 접근하는 Ref
  const modalRef = useRef();
  React.useEffect(() => {
    // dispatch(characterActions.getItemDB());
    setBg(equipBg?.itemImgUrl);
    setBody(equipColor?.itemImgUrl);
    setClothes(equipClothes?.itemImgUrl);
    setAcc(equipAcc?.itemImgUrl);
    // setEmotion(equipEmotion?.itemImgUrl);
  }, [equipBg?.itemImgUrl]);

  React.useEffect(() => {
    if (previewColor) {
      setBody(previewColor);
    }
    if (previewClothes) {
      setClothes(previewClothes);
    }
    if (previewBg) {
      setBg(previewBg);
    }
    if (previewAcc) {
      setAcc(previewAcc);
    }
  }, [preview]);

  return (
    <Container>
      <Point>{currentPoint}</Point>
      {viewBg && (
        <ImgContainer>
          <ItemImg src={Item + viewBg} ref={selectedBg} alt={viewBg}></ItemImg>
          <ItemImg
            src={Item + viewBody}
            ref={selectedBody}
            alt={viewBody}
          ></ItemImg>
          <ItemImg
            src={Item + viewClothes}
            ref={selectedClothes}
            alt={viewClothes}
          ></ItemImg>
          <ItemImg
            src={Item + viewAcc}
            ref={selectedAcc}
            alt={viewAcc}
          ></ItemImg>
        </ImgContainer>
      )}
      <Button
        _onClick={() => {
          // sendItems();
          modalRef.current.openModal();
        }}
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
      <ShoppingBasket1 ref={modalRef} />
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
