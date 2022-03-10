import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./LoginModal";

const ButtonNavigation = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  console.log("button", is_login);

  //모달창에 접근하는 ref
  const modalRef = React.useRef();
  console.log("모달ref!!!", modalRef);

  const confirmPage = () => {
    if (is_login) {
      // dispatch(challengeActions.setTab("navi"));
      // dispatch(challengeActions.naviChallengeDB());
      history.push(`/mychallenge/navi`);
    } else {
      console.log("로그인");
      modalRef.current.openModal();
    }
  };
  const writePage = () => {
    console.log("writePage", is_login);
    if (is_login) {
      history.push(`/postwrite`);
    } else {
      window.alert("로그인 후 인증 해주세요!");
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <Footer>
        <GradientBox />
        <ButtonWrap>
          <ButtonIcon onClick={() => history.push("/")}>홈</ButtonIcon>
          <ButtonIcon onClick={() => writePage()}>개설</ButtonIcon>
          <ButtonIcon onClick={confirmPage}>인증</ButtonIcon>
          {/* 채팅 추가 연결 필요 */}
          <ButtonIcon onClick={() => history.push("/character")}>
            캐릭터샵
          </ButtonIcon>
          <ButtonIcon onClick={() => history.push("/mypage")}>
            Mypage
          </ButtonIcon>
        </ButtonWrap>
      </Footer>

      <LoginModal ref={modalRef}>
        <Grid padding="30px 30px 0px 30px">
          <div>앗 로그인이 필요해요!</div>
          <Button onClick={() => history.push("/login")}></Button>;
        </Grid>
      </LoginModal>
    </React.Fragment>
  );
};

const Footer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 420px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: auto;
  width: 100%;
  background-color: gray;
`;

const ButtonIcon = styled.button`
  background-color: white;
  width: 70px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const GradientBox = styled.div`
  width: 100%;
  max-width: 420px;
  height: 50px;
  background: linear-gradient(
    to bottom,
    rgba(255, 139, 55, 0) 10%,
    rgba(255, 139, 55, 0.1) 25%,
    rgba(255, 139, 55, 0.3) 50%,
    rgba(255, 139, 55, 0.5) 80%,
    rgba(255, 139, 55, 0.8) 100%
  );
`;

export default ButtonNavigation;
