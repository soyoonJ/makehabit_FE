import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

const ButtonNavigation = () => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Footer>
        <ButtonWrap>
          <ButtonIcon onClick={() => history.push("/")}>홈</ButtonIcon>
          <ButtonIcon onClick={() => history.push("/postwrite")}>
            개설
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              dispatch(challengeActions.setTab("navi"));
              history.push("/mychallenge");
            }}
          >
            인증
          </ButtonIcon>
          {/* 채팅 추가 연결 필요 */}
          <ButtonIcon onClick={() => history.push("/")}>채팅</ButtonIcon>
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
export default ButtonNavigation;
