import React, { forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";

import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";
const LeaveModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModal() {
      setModalOpen(true);
    },
    closeModal() {
      setModalOpen(false);
    },
  }));
  const dispatch = useDispatch();
  const { challengeId } = props;

  // 테스트-------------------------------
  const [modalOpen, setModalOpen] = React.useState(false);

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
            // console.log("close modal!");
            closeModal();
          }
        }}
      >
        <section>
          <TitleBox>
            <TitleText>정말 탈퇴하시겠어요?</TitleText>
          </TitleBox>
          <ContentBox>
            <ContentText>탈퇴 버튼 선택시,</ContentText>
            <ContentText>챌린지에서 나오게 되어</ContentText>
            <ContentText>지금까지 도전하셨던</ContentText>
            <ContentText>챌린지 참여도가 초기화돼요.</ContentText>
          </ContentBox>
          <ButtonBox>
            <LeaveButton
              onClick={() => {
                dispatch(postActions.joinCancelDB(challengeId));
              }}
            >
              <LeaveText>챌린지 탈퇴하기</LeaveText>
            </LeaveButton>
          </ButtonBox>
          <ButtonBox style={{ marginTop: "0" }}>
            <CancelButton
              onClick={() => {
                closeModal();
              }}
            >
              <CancelText>취소</CancelText>
            </CancelButton>
          </ButtonBox>
        </section>
      </Container>
    );
  }
  return null;
});

LeaveModal.defaultProps = {
  children: null,
};

const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  display: flex;
  section {
    width: 80%;
    height: 22.5rem;
    margin: auto;
    align-self: center;
    background: #fff;
    border-radius: 10px;
  }
`;

const TitleBox = styled.div`
  text-align: center;
  margin: 1.813rem 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.625rem;
`;

const ContentBox = styled.div`
  text-align: center;
  margin: 0.5rem 3.313rem;
  display: flex;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-row: 1fr 1fr 1fr 1fr;
`;

const ContentText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
`;

const ButtonBox = styled.div`
  margin: 1.25rem 1.25rem;
`;

const LeaveButton = styled.button`
  width: 100%;
  height: 60px;
  cursor: pointer;
  background-color: #ff8b37;
  border: none;
  border-radius: 5px;
  color: #fff;
`;

const CancelButton = styled.button`
  margin-top: 0;
  width: 100%;
  height: 60px;
  cursor: pointer;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  color: #707070;
`;

const LeaveText = styled.span`
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.1813rem;
  color: white;
`;

const CancelText = styled.span`
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.1813rem;
  color: #707070;
`;

export default LeaveModal;
