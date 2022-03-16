import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Text, Grid } from "../elements";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { actionCreators as characterActions } from "../redux/modules/character";
import GridContainer from "../elements/ContainerGrid";

const ShoppingBasket1 = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModal() {
      setModalOpen(true);
    },
    closeModal() {
      setModalOpen(false);
    },
    account() {
      setTotalPoint(0);
      if (shopBg?.price && !shopBg.isOwned && !isNaN(shopBg?.price)) {
        setTotalPoint((totalPoint) => totalPoint + shopBg?.price);
      }
      if (shopColor?.price && !shopColor.isOwned && !isNaN(shopColor?.price)) {
        setTotalPoint((totalPoint) => totalPoint + shopColor?.price);
      }
      if (
        shopClothes?.price &&
        !shopClothes.isOwned &&
        !isNaN(shopClothes?.price)
      ) {
        setTotalPoint((totalPoint) => totalPoint + shopClothes?.price);
      }
      if (shopAcc?.price && !shopAcc.isOwned && !isNaN(shopAcc?.price)) {
        setTotalPoint((totalPoint) => totalPoint + shopAcc?.price);
      }
      if (
        shopEmotion?.price &&
        !shopEmotion.isOwned &&
        !isNaN(shopEmotion?.price)
      ) {
        setTotalPoint((totalPoint) => totalPoint + shopEmotion?.price);
      }
    },
    purchase() {
      let items = [];
      if (shopBg) {
        items.push({ _id: shopBg.itemId });
      } else {
        items.push({ _id: equipBg?.itemId });
      }
      if (shopColor) {
        items.push({ _id: shopColor.itemId });
      } else {
        items.push({ _id: equipColor?.itemId });
      }
      if (shopClothes) {
        items.push({ _id: shopClothes.itemId });
      } else {
        items.push({ _id: equipClothes?.itemId });
      }
      if (shopAcc) {
        items.push({ _id: shopAcc.itemId });
      } else {
        items.push({ _id: equipAcc?.itemId });
      }
      if (shopEmotion) {
        items.push({ _id: shopEmotion.itemId });
      } else {
        items.push({ _id: equipEmotion?.itemId });
      }
      dispatch(characterActions.purchaseItemList(totalPoint, items));
    },
  }));
  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.character.itemList);
  const category = itemList[0]?.category;
  const shopList = useSelector((state) => state.character.shopList);
  const { open, close, getData } = props;

  const setData = (categoryName) => {
    getData(categoryName);
  };

  // 테스트-------------------------------
  const [modalOpen, setModalOpen] = React.useState(false);
  // const openModal = () => {
  //   setModalOpen(true);
  // };

  const closeModal = () => {
    setModalOpen(false);
  };
  const currentPoint = useSelector((state) => state.character.currentPoint);

  const outSection = React.useRef();
  // ----------------------------------------
  const Item = process.env.PUBLIC_URL + "/items/small";
  // 장착 리스트
  const isEquip = useSelector((state) => state.character?.isEquip);
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");

  //Item 변경 할때 사용 하는 useState
  const [fitBg, setFitBg] = useState();
  const [fitColor, setFitColor] = useState();
  const [fitClothes, setFitClothes] = useState();
  const [fitAcc, setFitAcc] = useState();
  const [fitEmotion, setFitEmotion] = useState();

  // 미리보기 리스트
  const previewBg = useSelector((state) => state.character?.backgroundItem);
  const previewColor = useSelector((state) => state.character?.colorItem);
  const previewClothes = useSelector((state) => state.character?.clothesItem);
  const previewAcc = useSelector((state) => state.character?.accItem);
  const previewEmotion = useSelector((state) => state.character?.emotionItem);

  let itemBg = itemList?.find((e) => e.itemImgUrl === previewBg);
  let itemColor = itemList?.find((e) => e.itemImgUrl === previewColor);
  let itemClothes = itemList?.find((e) => e.itemImgUrl === previewClothes);
  let itemAcc = itemList?.find((e) => e.itemImgUrl === previewAcc);
  let itemEmotion = itemList?.find((e) => e.itemImgUrl === previewEmotion);

  //Item 변경 할때 사용 하는 useState
  const [shopBg, setBg] = useState();
  const [shopColor, setColor] = useState();
  const [shopClothes, setClothes] = useState();
  const [shopAcc, setAcc] = useState();
  const [shopEmotion, setEmotion] = useState();

  const [totalPoint, setTotalPoint] = useState(0);
  const [add, setAdd] = useState(false);

  React.useEffect(() => {
    //필터 리스트

    if (itemBg) {
      setBg(itemBg);
    }
    if (itemColor) {
      setColor(itemColor);
    }
    if (itemClothes) {
      setClothes(itemClothes);
    }
    if (itemAcc) {
      setAcc(itemAcc);
    }
    if (itemEmotion) {
      setEmotion(itemEmotion);
    }
    // account();
  }, [shopList]);

  // React.useEffect(() => {
  //   setFitBg(equipBg?.itemImgUrl);
  //   setFitColor(equipColor?.itemImgUrl);
  //   setFitClothes(equipClothes?.itemImgUrl);
  //   setFitAcc(equipAcc?.itemImgUrl);
  //   setFitEmotion(equipEmotion?.itemImgUrl)
  // }, [equipColor?.itemImgUrl]);
  const account = (item) => {
    console.log(
      "accoutn 실행됨?",
      shopList,
      shopBg,
      shopColor,
      shopClothes,
      shopAcc
    );
    if (item === "bg") {
      setTotalPoint((totalPoint) => totalPoint - shopBg?.price);
    }
    if (item === "color") {
      setTotalPoint((totalPoint) => totalPoint - shopColor?.price);
    }
    if (item === "clothes") {
      setTotalPoint((totalPoint) => totalPoint - shopClothes?.price);
    }
    if (item === "acc") {
      setTotalPoint((totalPoint) => totalPoint - shopAcc?.price);
    }
    if (item === "emotion") {
      setTotalPoint((totalPoint) => totalPoint - shopEmotion?.price);
    }
  };

  const purchase = () => {
    let items = [];
    if (shopBg) {
      items.push({ _id: shopBg.itemId });
    } else {
      items.push({ _id: equipBg?.itemId });
    }
    if (shopColor) {
      items.push({ _id: shopColor.itemId });
    } else {
      items.push({ _id: equipColor?.itemId });
    }
    if (shopClothes) {
      items.push({ _id: shopClothes.itemId });
    } else {
      items.push({ _id: equipClothes?.itemId });
    }
    if (shopAcc) {
      items.push({ _id: shopAcc.itemId });
    } else {
      items.push({ _id: equipAcc?.itemId });
    }
    if (shopEmotion) {
      items.push({ _id: shopEmotion.itemId });
    } else {
      items.push({ _id: equipEmotion?.itemId });
    }
    dispatch(characterActions.purchaseItemList(totalPoint, items));
  };
  if (modalOpen) {
    return (
      <Container
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            // console.log("close modal!");
            closeModal();
          }
        }}
      >
        <section>
          <ModalHeader>{<Text>내가 담은 목록{currentPoint}</Text>}</ModalHeader>
          <ModalContent>
            {!shopBg && !shopColor && !shopClothes && !shopAcc && !shopEmotion
              ? closeModal()
              : ""}
            {shopBg && !shopBg.isOwned ? (
              <GridContainer>
                <GridBox>
                  <ImageContainer style={{ position: "relative" }}>
                    <PostImage src={Item + shopBg.itemImgUrl}></PostImage>
                  </ImageContainer>
                  <ItemName>{shopBg.itemName}</ItemName>
                  <ItemPrice>{shopBg.price}</ItemPrice>
                  <ItemCancel
                    onClick={() => {
                      setBg("");
                      account("bg");
                    }}
                  >
                    X
                  </ItemCancel>
                </GridBox>
              </GridContainer>
            ) : (
              ""
            )}
            {shopColor && !shopColor.isOwned ? (
              <GridContainer>
                <GridBox>
                  <ImageContainer style={{ position: "relative" }}>
                    <PostImage src={Item + shopColor.itemImgUrl}></PostImage>
                  </ImageContainer>
                  <ItemName>{shopColor.itemName}</ItemName>
                  <ItemPrice>{shopColor.price}</ItemPrice>
                  <ItemCancel
                    onClick={() => {
                      setColor("");
                      account("color");
                    }}
                  >
                    X
                  </ItemCancel>
                </GridBox>
              </GridContainer>
            ) : (
              ""
            )}
            {shopClothes && !shopClothes.isOwned ? (
              <GridContainer>
                <GridBox>
                  <ImageContainer style={{ position: "relative" }}>
                    <PostImage src={Item + shopClothes.itemImgUrl}></PostImage>
                  </ImageContainer>
                  <ItemName>{shopClothes.itemName}</ItemName>
                  <ItemPrice>{shopClothes.price}</ItemPrice>
                  <ItemCancel
                    onClick={() => {
                      setClothes("");
                      account("clothes");
                    }}
                  >
                    X
                  </ItemCancel>
                </GridBox>
              </GridContainer>
            ) : (
              ""
            )}
            {shopAcc && !shopAcc.isOwned ? (
              <GridContainer>
                <GridBox>
                  <ImageContainer style={{ position: "relative" }}>
                    <PostImage src={Item + shopAcc.itemImgUrl}></PostImage>
                  </ImageContainer>
                  <ItemName>{shopAcc.itemName}</ItemName>
                  <ItemPrice>{shopAcc.price}</ItemPrice>
                  <ItemCancel
                    onClick={() => {
                      setAcc(null);
                      account("acc");
                    }}
                  >
                    X
                  </ItemCancel>
                </GridBox>
              </GridContainer>
            ) : (
              ""
            )}
            {shopEmotion && !shopEmotion.isOwned ? (
              <GridContainer>
                <GridBox>
                  <ImageContainer style={{ position: "relative" }}>
                    <PostImage src={Item + shopEmotion.itemImgUrl}></PostImage>
                  </ImageContainer>
                  <ItemName>{shopEmotion.itemName}</ItemName>
                  <ItemPrice>{shopEmotion.price}</ItemPrice>
                  <ItemCancel
                    onClick={() => {
                      setAcc(null);
                      account("acc");
                    }}
                  >
                    X
                  </ItemCancel>
                </GridBox>
              </GridContainer>
            ) : (
              ""
            )}
          </ModalContent>
          <ButtonBox>
            <Button
              onClick={() => {
                purchase();
              }}
            >
              {totalPoint}
              P로 구매하고 저장
            </Button>
          </ButtonBox>
        </section>
      </Container>
    );
  }
  return null;
});

ShoppingBasket1.defaultProps = {
  children: null,
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 100%;
  width: 100%;
  max-width: 420px;

  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  display: flex;

  section {
    width: 100%;
    // height: 50%;
    align-self: end;
    // background: #fff;
    background-color: transparent !important;
  }

  section > div {
    &:nth-child(1) {
      cursor: pointer;
      text-align: right;
      margin: 20px;
      font-size: 1.3rem;
    }
  }

  section > div > div {
    &:nth-child(1) {
      font-weight: bold;
      margin-bottom: 20px;
    }
    &:nth-child(2) {
    }
  }
`;
const ModalBox = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -300px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OpenModal = styled(ModalBox)`
  /* 팝업이 스르륵 열리는 효과 */
  animation: modal-bg-show 0.6s;
`;

const ModalHeader = styled.header`
  min-height: 10vh;
  position: relative;
  padding: 16px;
  background-color: #f1f1f1;
  color: #ff8b37;
  text-align: center;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const Section = styled.section`
  width: 100%;
  margin: auto;
  max-width: 350px;
  border-radius: 0.3rem;
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  background-color: #fff;
  /* 팝업이 스르륵 열리는 효과 */
  animation: modal-show 0.3s linear;
  overflow: hidden;
`;

const ModalContent = styled.div`
  height: 100%;
  min-height: 90vh;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  overflow-y: auto;
`;

const Footer = styled.footer`
  padding: 12px 16px;
  text-align: right;
`;
const ButtonBox = styled.div`
  width: 100%;
  background-color: #fff;
`;
const Button = styled.button`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  max-width: 420px;
  background-color: #ff8b37;
  color: white;
  border: none;
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
export default ShoppingBasket1;
