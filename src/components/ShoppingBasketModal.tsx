import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

import { actionCreators as characterActions } from "../redux/modules/character";

const ShoppingBasketModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModal() {
      setModalOpen(true);
    },
    closeModal() {
      setModalOpen(false);
      setTotalPoint(0);
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
        items.push(shopBg.itemId);
      } else {
        items.push(equipBg?.itemId);
      }
      if (shopColor) {
        items.push(shopColor.itemId);
      } else {
        items.push(equipColor?.itemId);
      }
      if (shopClothes) {
        items.push(shopClothes.itemId);
      } else {
        items.push(equipClothes?.itemId);
      }
      if (shopAcc) {
        items.push(shopAcc.itemId);
      } else {
        items.push(equipAcc?.itemId);
      }
      if (shopEmotion) {
        items.push(shopEmotion.itemId);
      } else {
        items.push(equipEmotion?.itemId);
      }
      // console.log("ItemsList다", items);
      dispatch(characterActions.purchaseItemList(totalPoint, items));
    },
    reset() {
      setBg("");
      setColor("");
      setEmotion("");
      setClothes("");
      setAcc("");
    },
  }));
  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.character.itemList);

  const shopList = useSelector((state) => state.character.shopList);

  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setTotalPoint(0);
  };
  const currentPoint = useSelector((state) => state.character.currentPoint);

  const outSection = React.useRef();

  const Item = process.env.PUBLIC_URL + "/items/small";
  // 장착 리스트
  const isEquip = useSelector((state) => state.character?.isEquip);
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");

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

  React.useEffect(() => {
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
  }, [shopList]);

  const account = (item) => {
    if (item === "bg") {
      setTotalPoint((totalPoint) => totalPoint - shopBg?.price);
    }
    // color 전부 무료로 바뀌어서 account에서 빠짐
    // if (item === "color") {
    //   setTotalPoint((totalPoint) => totalPoint - shopColor?.price);
    // }
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
      items.push(shopBg.itemId);
    } else {
      items.push(equipBg?.itemId);
    }
    if (shopColor) {
      items.push(shopColor.itemId);
    } else {
      items.push(equipColor?.itemId);
    }
    if (shopClothes) {
      items.push(shopClothes.itemId);
    } else {
      items.push(equipClothes?.itemId);
    }
    if (shopAcc) {
      items.push(shopAcc.itemId);
    } else {
      items.push(equipAcc?.itemId);
    }
    if (shopEmotion) {
      items.push(shopEmotion.itemId);
    } else {
      items.push(equipEmotion?.itemId);
    }
    if (currentPoint >= totalPoint) {
      dispatch(characterActions.purchaseItemList(totalPoint, items));
    } else {
      window.alert("포인트가 부족합니다.");
      return;
    }
  };
  const Icon = process.env.PUBLIC_URL + "/images";
  if (modalOpen) {
    return (
      <Container
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            closeModal();
          }
        }}
      >
        <section>
          <ModalHeader>
            <ModalHeaderBox>
              <ToRight style={{ cursor: "pointer" }}>
                <ItemCancel
                  onClick={() => {
                    closeModal();
                  }}
                >
                  <Img width="22px" src={Icon + "/icon_close.svg"} />
                </ItemCancel>
              </ToRight>
            </ModalHeaderBox>
            <ModalHeaderContentBox>
              <ToLeft>
                <TitleText>내가 담은 목록</TitleText>
              </ToLeft>
              <ToRight>
                <Img width="22px" src={Icon + "/icon_coin.svg"} />
                <TitlePoint>내 포인트 &nbsp;</TitlePoint>
                <TitlePoint>{currentPoint}</TitlePoint>
              </ToRight>
            </ModalHeaderContentBox>
          </ModalHeader>
          <ModalContent>
            <ContentBox>
              {!shopBg && !shopClothes && !shopAcc && !shopEmotion
                ? closeModal()
                : ""}

              {shopBg && !shopBg.isOwned ? (
                <MarginBox>
                  <GridBox>
                    <PreviewImg>
                      <ImageContainer style={{ position: "relative" }}>
                        <PostImage src={Item + shopBg.itemImgUrl}></PostImage>
                      </ImageContainer>
                    </PreviewImg>
                    <ItemInfo>
                      <ItemName>{shopBg.itemName}</ItemName>
                      <ItemOwned>미보유 중</ItemOwned>
                      <ToLeft>
                        <Img
                          style={{ margin: "0  10px 0 0" }}
                          width="22px"
                          src={Icon + "/icon_coin.svg"}
                        />
                        <ItemPrice>{shopBg.price}</ItemPrice>
                      </ToLeft>
                    </ItemInfo>

                    <ToRight
                      style={{
                        alignItems: "flex-start",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      <ItemCancel
                        onClick={() => {
                          setBg("");
                          account("bg");
                        }}
                      >
                        <Img
                          width="28px"
                          style={{ margin: "0" }}
                          src={Icon + "/icon_close(shop).svg"}
                        />
                      </ItemCancel>
                    </ToRight>
                  </GridBox>
                </MarginBox>
              ) : (
                ""
              )}
              {shopColor && !shopColor.isOwned ? (
                <MarginBox>
                  <GridBox>
                    <PreviewImg>
                      <ImageContainer style={{ position: "relative" }}>
                        <PostImage
                          src={Item + shopColor.itemImgUrl}
                        ></PostImage>
                      </ImageContainer>
                    </PreviewImg>
                    <ItemInfo>
                      <ItemName>{shopColor.itemName}</ItemName>
                      <ItemOwned>미보유 중</ItemOwned>
                      <ToLeft>
                        <Img
                          style={{ margin: "0  10px 0 0" }}
                          width="22px"
                          src={Icon + "/icon_coin.svg"}
                        />
                        <ItemPrice>{shopColor.price}</ItemPrice>
                      </ToLeft>
                    </ItemInfo>

                    <ToRight
                      style={{
                        alignItems: "flex-start",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      <ItemCancel
                        onClick={() => {
                          setColor("");
                          account("color");
                        }}
                      >
                        <Img
                          width="28px"
                          style={{ margin: "0" }}
                          src={Icon + "/icon_close(shop).svg"}
                        />
                      </ItemCancel>
                    </ToRight>
                  </GridBox>
                </MarginBox>
              ) : (
                ""
              )}
              {shopEmotion && !shopEmotion.isOwned ? (
                <MarginBox>
                  <GridBox>
                    <PreviewImg>
                      <ImageContainer style={{ position: "relative" }}>
                        <PostImage
                          src={Item + shopEmotion.itemImgUrl}
                        ></PostImage>
                      </ImageContainer>
                    </PreviewImg>
                    <ItemInfo>
                      <ItemName>{shopEmotion.itemName}</ItemName>
                      <ItemOwned>미보유 중</ItemOwned>
                      <ToLeft>
                        <Img
                          style={{ margin: "0  10px 0 0" }}
                          width="22px"
                          src={Icon + "/icon_coin.svg"}
                        />
                        <ItemPrice>{shopEmotion.price}</ItemPrice>
                      </ToLeft>
                    </ItemInfo>

                    <ToRight
                      style={{
                        alignItems: "flex-start",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      <ItemCancel
                        onClick={() => {
                          setEmotion("");
                          account("emotion");
                        }}
                      >
                        <Img
                          width="28px"
                          style={{ margin: "0" }}
                          src={Icon + "/icon_close(shop).svg"}
                        />
                      </ItemCancel>
                    </ToRight>
                  </GridBox>
                </MarginBox>
              ) : (
                ""
              )}

              {shopClothes && !shopClothes.isOwned ? (
                <MarginBox>
                  <GridBox>
                    <PreviewImg>
                      <ImageContainer style={{ position: "relative" }}>
                        <PostImage
                          src={Item + shopClothes.itemImgUrl}
                        ></PostImage>
                      </ImageContainer>
                    </PreviewImg>
                    <ItemInfo>
                      <ItemName>{shopClothes.itemName}</ItemName>
                      <ItemOwned>미보유 중</ItemOwned>
                      <ToLeft>
                        <Img
                          style={{ margin: "0  10px 0 0" }}
                          width="22px"
                          src={Icon + "/icon_coin.svg"}
                        />
                        <ItemPrice>{shopClothes.price}</ItemPrice>
                      </ToLeft>
                    </ItemInfo>

                    <ToRight
                      style={{
                        alignItems: "flex-start",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      <ItemCancel
                        onClick={() => {
                          setClothes("");
                          account("clothes");
                        }}
                      >
                        <Img
                          width="28px"
                          style={{ margin: "0" }}
                          src={Icon + "/icon_close(shop).svg"}
                        />
                      </ItemCancel>
                    </ToRight>
                  </GridBox>
                </MarginBox>
              ) : (
                ""
              )}
              {shopAcc && !shopAcc.isOwned ? (
                <MarginBox>
                  <GridBox>
                    <PreviewImg>
                      <ImageContainer style={{ position: "relative" }}>
                        <PostImage src={Item + shopAcc.itemImgUrl}></PostImage>
                      </ImageContainer>
                    </PreviewImg>
                    <ItemInfo>
                      <ItemName>{shopAcc.itemName}</ItemName>
                      <ItemOwned>미보유 중</ItemOwned>
                      <ToLeft>
                        <Img
                          style={{ margin: "0  10px 0 0" }}
                          width="22px"
                          src={Icon + "/icon_coin.svg"}
                        />
                        <ItemPrice>{shopAcc.price}</ItemPrice>
                      </ToLeft>
                    </ItemInfo>

                    <ToRight
                      style={{
                        alignItems: "flex-start",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      <ItemCancel
                        onClick={() => {
                          setAcc("");
                          account("acc");
                        }}
                      >
                        <Img
                          width="28px"
                          style={{ margin: "0" }}
                          src={Icon + "/icon_close(shop).svg"}
                        />
                      </ItemCancel>
                    </ToRight>
                  </GridBox>
                </MarginBox>
              ) : (
                ""
              )}
            </ContentBox>
            <MarginBottom />
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

ShoppingBasketModal.defaultProps = {
  children: null,
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 100%;

  width: 100%;
  max-width: 420px;

  background: rgba(0, 0, 0, 0.6);
  z-index: 101;
  display: flex;

  section {
    width: 100%;
    height: 85vh;
    align-self: end;
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
  height: 100%;
  max-height: 6.5rem;
  position: relative;
  background-color: white;
  color: #ff8b37;
  text-align: center;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom: 1.5px solid #e0e0e0;
`;

const ModalHeaderBox = styled.div`
  min-height: 3.25rem;
  margin: 0.625rem 1.25rem;
  display: grid;
  align-items: center;
`;
const ModalHeaderContentBox = styled.div`
  min-height: 3.25rem;
  margin: 0.625rem 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ToLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

const ToRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const TitleText = styled.span`
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.813rem;
`;
const Img = styled.img`
  size: 1.375em;
  margin: 0.625rem;
`;
const TitlePoint = styled.span`
  font-size: 1rem;
  font-weight: bold;
  line-height: 1rem;
  color: black;
`;

const ModalContent = styled.div`
  height: 65vh;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  overflow: auto;
  // margin-bottom: 6.625rem;
  -ms-overflow-style: none;

  // 내용 height > max-height : max-height 적용.
  // 내용 height < max-height : 내용 height 적용.
  @media screen and (max-width: 420px) {
    // max-height: 10rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  background-color: #fff;

  position: fixed;
  bottom: 0;
  height: 6.625rem;
  width: 100%;
  max-width: 420px;

  // background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  display: flex;
`;

const ConfirmBox = styled.div`
  width: 100%;
  background-color: #ddd;
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: #707070;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  height: 4.188rem;
  width: 100%;
  margin: 1.25rem;
  max-width: 26.25rem;
  background-color: #ff8b37;
  color: white;
  border: none;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.813rem;
  border-radius: 5px;
`;

const MarginBox = styled.div`
  margin: 0 1.25rem;
  padding: 2.72vh 0;
`;
const GridBox = styled.div`
  display: grid;
  max-width: 420px;
  grid-template-columns: 2fr 3fr 1fr;
  gap: 4%;
`;
const PreviewImg = styled.div`
  // min-width: 100px;
  width: 100px;
  height: 114px;
  border-radius: 10px;
  background-color: #f7f7f7;
`;
const ImageContainer = styled.div`
  // width: 100%;
  height: 114px;
  grid-column: 1/2;
`;
const PostImage = styled.img`
  width: 100%;
  height: 114px;
  // min-height: 15vh;
  object-fit: cover;
  border-radius: 10px;
`;
const ItemInfo = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 7.125rem;
`;
const ItemName = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.625rem;
  color: black;
`;
const ItemOwned = styled.span`
  font-size: 1rem;
  line-height: 1rem;
  align-items: center;
  color: #6825d6;
`;
const ItemPriceBox = styled.div`
  // align-items: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
`;

const ItemPrice = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.625rem;
  color: black;
`;

const ItemCancel = styled.div`
  grid-column: 4/5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pinter;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const ContentBox = styled.div`
  margin-bottom: 6.625rem;
`;
const MarginBottom = styled.div`
  padding-bottom: 5rem;

  @media (max-width: 320px) {
    padding-bottom: 8rem;
  }
`;

export default ShoppingBasketModal;
