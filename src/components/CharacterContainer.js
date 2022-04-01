import React, { useRef, useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as characterActions } from "../redux/modules/character";
import { Button } from "../elements";

import ShoppingBasket1 from "../components/ShoppingBasket1";

const CharacterContainer = () => {
  const dispatch = useDispatch();

  const Item = process.env.PUBLIC_URL + "/items/large";

  const currentPoint = useSelector((state) => state.character.currentPoint);

  const isEquip = useSelector((state) => state.character?.isEquip);
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");

  // 미리보기
  const preview = useSelector((state) => state.character);
  const previewColor = useSelector((state) => state.character?.colorItem);
  const previewBg = useSelector((state) => state.character?.backgroundItem);
  const previewClothes = useSelector((state) => state.character?.clothesItem);
  const previewAcc = useSelector((state) => state.character?.accItem);
  const previewEmotion = useSelector((state) => state.character?.emotionItem);

  //Item 변경 할때 사용 하는 useState
  const [viewBody, setBody] = useState();
  const [viewBg, setBg] = useState();
  const [viewClothes, setClothes] = useState();
  const [viewAcc, setAcc] = useState();
  const [viewEmotion, setEmotion] = useState();

  const allList = useSelector((state) => state.character.allList);

  // 저장하기 눌렀을 때 선택되어있는 아이템 전체정보
  const selectedBg = allList.find((e) => e.itemImgUrl === viewBg);
  const selectedBody = allList.find((e) => e.itemImgUrl === viewBody);
  const selectedAcc = allList.find((e) => e.itemImgUrl === viewClothes);
  const selectedClothes = allList.find((e) => e.itemImgUrl === viewAcc);
  const selectedEmotion = allList.find((e) => e.itemImgUrl === viewEmotion);
  // console.log("현재바디", selectedBody);

  //자식 함수 접근하는 Ref
  const modalRef = useRef();
  React.useEffect(() => {
    setBody(equipColor?.itemImgUrl);
    setBg(equipBg?.itemImgUrl);
    setClothes(equipClothes?.itemImgUrl);
    setAcc(equipAcc?.itemImgUrl);
    setEmotion(equipEmotion?.itemImgUrl);
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
    if (previewEmotion) {
      setEmotion(previewEmotion);
    }
  }, [preview]);

  const saveButton = () => {
    if (
      selectedBg?.isOwned &&
      selectedBody?.isOwned &&
      selectedAcc?.isOwned &&
      selectedEmotion?.isOwned &&
      selectedClothes?.isOwned
    ) {
      modalRef.current.purchase();
    } else {
      modalRef.current.account();
      modalRef.current.openModal();
    }
  };

  const resetButton = () => {
    setBody(equipColor?.itemImgUrl);
    setBg(equipBg?.itemImgUrl);
    setClothes(equipClothes?.itemImgUrl);
    setAcc(equipAcc?.itemImgUrl);
    setEmotion(equipEmotion?.itemImgUrl);

    dispatch(characterActions.backgroundPreview(null));
    dispatch(characterActions.colorPreview(null));
    dispatch(characterActions.clothesPreview(null));
    dispatch(characterActions.accPreview(null));
    dispatch(characterActions.emotionPreview(null));
    dispatch(characterActions.resetItems());
    modalRef.current.reset();
  };

  return (
    <Container>
      <Point>
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/icon_coin.svg"}
            alt="포인트 아이콘"
            style={{
              width: "2.6vh",
              height: "2.6vh",
              marginRight: "0.94vh",
            }}
          />
          <span>{currentPoint}</span>
        </div>
      </Point>
      {viewBg && (
        <ImgContainer>
          <ItemImg
            src={Item + viewBg}
            style={{ width: "100%", objectFit: "cover" }}
          ></ItemImg>
          <ItemImg src={Item + viewBody}></ItemImg>
          <ItemImg src={Item + viewClothes}></ItemImg>
          <ItemImg src={Item + viewAcc}></ItemImg>
          <ItemImg src={Item + viewEmotion}></ItemImg>
        </ImgContainer>
      )}
      <Button
        _onClick={saveButton}
        position="absolute"
        bottom="0"
        right="0"
        margin="0 5% 2vh 0"
        bg="#6825D6"
        color="#fff"
        width="13.74vh"
        height="4.74vh"
        lineHeight="2.79vh"
        borderRadius="3.125rem"
        fontSize="2.13vh"
        alignSelf="end"
        fontWeight="600"
        centerFlex
        zIndex="5"
      >
        {selectedBg?.isOwned &&
        selectedBody?.isOwned &&
        selectedEmotion?.isOwned &&
        selectedAcc?.isOwned &&
        selectedClothes?.isOwned
          ? "저장하기"
          : "구매 및 저장"}
      </Button>

      <Restart
        onClick={resetButton}
        src={process.env.PUBLIC_URL + "images/restart_img.png"}
        alt="restart_img"
      />
      <ShoppingBasket1 ref={modalRef} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 46vh;

  // 모바일 버전
  @media (min-width: 420px) {
    height: 48.5vh;
  }
`;
const Point = styled.div`
  position: absolute;
  margin: 2.6vh 0 0 5%;
  background: #fff;

  border-radius: 3.125rem;
  border: 1.5px solid #cfcfcf;
  z-index: 5;
  display: flex;
  align-items: center;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.59vh 1.18vh;
    text-align: center;
  }

  & > div > span {
    font-weight: 600;
    font-size: 1.89vh;
  }
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

const Restart = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30.5%;
  margin: 0 0 2vh 5%;
  z-index: 5;
`;
export default CharacterContainer;
