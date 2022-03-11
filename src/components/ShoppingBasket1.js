import React, { useRef, forwardRef, useImperativeHandle } from "react";
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
  }));
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(characterActions.getItemDB("background"));
  }, []);
  const itemList = useSelector((state) => state.character.itemList);

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

  const outSection = React.useRef();
  // ----------------------------------------
  const Item = process.env.PUBLIC_URL + "/items/large";
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
          <ModalHeader>내가 담은 목록</ModalHeader>
          <ModalContent>
            {itemList?.map((e, i) => (
              <GridContainer>
                <GridBox key={e._id}>
                  <ImageContainer style={{ position: "relative" }}>
                    <PostImage
                      src={itemList && Item + itemList[i].itemImgUrl}
                    ></PostImage>
                  </ImageContainer>
                  <ItemName>{itemList && itemList[i].itemName}</ItemName>
                  <ItemPrice>
                    {itemList && itemList[i].isOwned
                      ? "구매함"
                      : itemList[i].price}
                  </ItemPrice>
                  <ItemCancel>X</ItemCancel>
                </GridBox>
              </GridContainer>
            ))}
          </ModalContent>
          <ButtonBox>
            <Button>P로 구매하고 저장</Button>
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
