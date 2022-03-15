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
  // console.log(currentPoint);

  const isEquip = useSelector((state) => state.character?.isEquip);
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");
  console.log("isEquip", isEquip);
  console.log(
    "equip확인",
    isEquip,
    equipBg?.itemImgUrl,
    equipColor?.itemImgUrl,
    equipClothes?.itemImgUrl,
    equipAcc?.itemImgUrl
  );

  // 미리보기
  const preview = useSelector((state) => state.character);
  console.log("미리보기", preview);
  const previewColor = useSelector((state) => state.character?.colorItem);
  const previewBg = useSelector((state) => state.character?.backgroundItem);
  const previewClothes = useSelector((state) => state.character?.clothesItem);
  const previewAcc = useSelector((state) => state.character?.accItem);

  //Item 변경 할때 사용 하는 useState
  const [viewBody, setBody] = useState();
  const [viewBg, setBg] = useState();
  const [viewClothes, setClothes] = useState();
  const [viewAcc, setAcc] = useState();
  // const [viewEmotion, setEmotion] = useState();
  // console.log("데이터?", viewBg, viewBody, viewClothes, viewAcc);

  const allList = useSelector((state) => state.character.allList);
  // console.log("리스트?", allList);

  // 저장하기 눌렀을 때 선택되어있는 아이템 전체정보
  const selectedBg = allList.find((e) => e.itemImgUrl === viewBg);
  const selectedBody = allList.find((e) => e.itemImgUrl === viewBody);
  const selectedAcc = allList.find((e) => e.itemImgUrl === viewClothes);
  const selectedClothes = allList.find((e) => e.itemImgUrl === viewAcc);
  // console.log("현재바디", selectedBody);

  //자식 함수 접근하는 Ref
  const modalRef = useRef();
  React.useEffect(() => {
    // dispatch(characterActions.getItemDB());
    setBody(equipColor?.itemImgUrl);
    setBg(equipBg?.itemImgUrl);
    setClothes(equipClothes?.itemImgUrl);
    setAcc(equipAcc?.itemImgUrl);
    // setEmotion(equipEmotion?.itemImgUrl);
  }, [equipColor?.itemImgUrl]);

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

  const saveButton = () => {
    // sendItems();
    if (
      selectedBg?.isOwned &&
      selectedBody?.isOwned &&
      selectedAcc?.isOwned &&
      selectedClothes?.isOwned
    ) {
      // history.push("/charactersave");
      modalRef.current.purchase();
    } else {
      modalRef.current.account();
      modalRef.current.openModal();
    }
  };

  return (
    <Container>
      <Point>{currentPoint}</Point>
      {viewBg && (
        <ImgContainer>
          <ItemImg src={Item + viewBg} alt={viewBg}></ItemImg>
          <ItemImg src={Item + viewBody} alt={viewBody}></ItemImg>
          <ItemImg src={Item + viewClothes} alt={viewClothes}></ItemImg>
          <ItemImg src={Item + viewAcc} alt={viewAcc}></ItemImg>
        </ImgContainer>
      )}
      <Button
        _onClick={saveButton}
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
        {selectedBg?.isOwned &&
        selectedBody?.isOwned &&
        selectedAcc?.isOwned &&
        selectedClothes?.isOwned
          ? "저장하기"
          : "구매 및 저장"}
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
