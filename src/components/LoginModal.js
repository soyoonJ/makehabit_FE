import React, { forwardRef, useImperativeHandle } from "react";
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

  const { in_page } = props;

  // const setData = (categoryName) => {
  //   getData(categoryName);
  // };

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
          <Grid padding="45px 30px 45px 30px">
            <Text
              size="22px"
              bold
              alignCenter
              color="#FF8B37"
              margin="0px 0px 0px 0px"
            >
              로그인이 필요한
            </Text>
            <Text
              size="22px"
              bold
              alignCenter
              color="#FF8B37"
              margin="5px 0px 10px 0px"
            >
              페이지입니다
            </Text>
            <Text size="16x" alignCenter margin="24px 0px 5px 0px">
              지금 로그인하고 습관삼끼와 함께
            </Text>
            <Text size="16x" alignCenter margin="0px 0px 0px 0px">
              다양한 습관을 만들어봐요!
            </Text>
            <Button
              bg="#FF8B37"
              size="22px"
              width="100%"
              margin="37px 0px 0px 0px"
              _onClick={() => history.push("/login")}
            >
              로그인하러가기
            </Button>
            {in_page ? (
              <Button
                bold
                bg="white"
                color="#707070"
                size="22px"
                width="100%"
                margin="5px 0px 0px 0px"
                _onClick={closeModal}
              >
                좀 더 둘러보기
              </Button>
            ) : (
              ""
            )}

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
  z-index: 102;
  display: flex;
  overflow: hidden;
  /* max-height: 100%; */
  /* overflow: scroll; */
  /* width: 100%; */

  @media screen and (min-width: 420px) {
    max-height: 100vh;
    /* position: fixed; */
    overflow: auto;
  }

  section {
    position: relative;
    width: 282px;
    height: auto;
    margin: auto;
    align-self: center;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    max-height: 100%;
    /* position: sticky; */
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

// const XIcon = styled.div`
//   position: absolute;
//   right: 0;
//   top: 0;
//   cursor: pointer;
//   text-align: right;
//   margin: 20px;
//   font-size: 1.3rem;
// `;

export default LoginModal;
