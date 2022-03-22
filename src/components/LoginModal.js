import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { history } from "../redux/configureStore";

import { Text, Grid, Button } from "../elements";
import styled from "styled-components";

const LoginModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModal() {
      setModalOpen(true);
    },
    closeModal() {
      setModalOpen(false);
    },
  }));

  const { open, close, getData, children, in_page } = props;

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

  // const outSection = React.useRef();
  // ----------------------------------------

  if (modalOpen) {
    return (
      <Container>
        <section>
          {in_page ? <XIcon onClick={closeModal}>X</XIcon> : ""}
          <Grid padding="30px 30px 0px 30px">
            <Text size="22px" bold alignCenter color="#FF8B37">
              로그인이 필요한 페이지입니다
            </Text>
            <Button margin="10px 0px" _onClick={() => history.push("/login")}>
              로그인하러가기
            </Button>
            {/* 그냥 둘러보기 버튼 추가 시 in_page일 경우에는 버튼 안 뜨게 해야 함 */}
          </Grid>
        </section>
      </Container>
    );
  }
  return null;
});

LoginModal.defaultProps = {
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
  max-height: 100vh;
  overflow: auto;

  section {
    /* position: relative; */
    width: 80%;
    height: 50%;
    margin: auto;
    align-self: center;
    background: #fff;
    border-radius: 10px;
    position: sticky;
  }

  // section > div > div {
  //   &:nth-child(1) {
  //     font-weight: bold;
  //     margin-bottom: 20px;
  //   }
  //   &:nth-child(2) {
  //   }
  // }
`;

const XIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  text-align: right;
  margin: 20px;
  font-size: 1.3rem;
`;

export default LoginModal;
