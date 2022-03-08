import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

const ButtonNavigation = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const confirmPage = () => {
    if (is_login) {
      dispatch(challengeActions.setTab("navi"));
      history.push("/mychallenge");
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
          <ButtonIcon onClick={() => history.push("/postwrite")}>
            개설
          </ButtonIcon>
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
