import React from "react";
// import { Text } from "../elements";
import styled from "styled-components";

const CategoryModal = (props) => {
  const { open, close, getData, _onChange } = props;

  const setData = (categoryName) => {
    getData(categoryName);
  };

  //추가내용 (상봉님내용)
  const [modalOpen, setModalOpen] = React.useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const outSection = React.useRef();

  if (open) {
    return (
      <OpenModal
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            // console.log("close modal!");
            closeModal();
          }
        }}
        onChange={_onChange}
      >
        <Section>
          <ModalHeader>카테고리</ModalHeader>
          <ModalContent>
            <Button
              onClick={() => {
                close();
                setData("공부");
                // console.log(setData);
              }}
            >
              공부
            </Button>
            <Button
              onClick={() => {
                close();
                setData("운동");
              }}
            >
              운동
            </Button>
            <Button
              onClick={() => {
                close();
                setData("자기계발");
              }}
            >
              자기계발
            </Button>
            <Button
              onClick={() => {
                close();
                setData("생활습관");
              }}
            >
              생활습관
            </Button>
            <Button
              onClick={() => {
                close();
                setData("에코");
              }}
            >
              에코
            </Button>
          </ModalContent>
        </Section>
      </OpenModal>
    );
  }
  return null;
};

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
  display: flex;
  justify-content: center;
  align-items: center;

  /* 팝업이 스르륵 열리는 효과 */
  animation: modal-bg-show 0.6s;
`;

const ModalHeader = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
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
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`;

// const Footer = styled.footer`
//   padding: 12px 16px;
//   text-align: right;
// `;

const Button = styled.button`
  width: 100%;
  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  border: 0;
`;

export default CategoryModal;
