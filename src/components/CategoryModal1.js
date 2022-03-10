import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Text, Grid } from "../elements";
import styled from "styled-components";

const Modal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModal() {
      setModalOpen(true);
    },
    closeModal() {
      setModalOpen(false);
    },
  }));

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

  if (modalOpen) {
    return (
      <Container
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            console.log("close modal!");
            closeModal();
          }
        }}
      >
        <section>
          <ModalHeader>카테고리</ModalHeader>
          <ModalContent>
            <Grid borderBottom="3px solid #f7f7f7">
              <Button
                onClick={() => {
                  closeModal();
                  setData(0);
                }}
              >
                공부
              </Button>
            </Grid>
            <Grid borderBottom="3px solid #f7f7f7">
              <Button
                onClick={() => {
                  closeModal();
                  setData(1);
                }}
              >
                운동
              </Button>
            </Grid>

            <Grid borderBottom="3px solid #f7f7f7">
              <Button
                onClick={() => {
                  closeModal();
                  setData(2);
                }}
              >
                자기계발
              </Button>
            </Grid>

            <Grid borderBottom="3px solid #f7f7f7">
              <Button
                onClick={() => {
                  closeModal();
                  setData(3);
                }}
              >
                생활습관
              </Button>
            </Grid>

            <Grid borderBottom="3px solid #f7f7f7">
              <Button
                onClick={() => {
                  closeModal();
                  setData("에코");
                }}
              >
                에코
              </Button>
            </Grid>
          </ModalContent>
        </section>
      </Container>
    );
  }
  return null;
});

Modal.defaultProps = {
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
  height: 50%;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`;

const Footer = styled.footer`
  padding: 12px 16px;
  text-align: right;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  color: #000;
  background-color: white;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  border: 0;
`;
export default Modal;
