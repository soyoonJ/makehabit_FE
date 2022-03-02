import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";

import styled from "styled-components";
import { history } from "../redux/configureStore";

const ButtonNavigation = () => {
  return (
    <React.Fragment>
      <Footer>
        <ButtonWrap>
          <ButtonIcon onClick={() => history.push("/")}>홈</ButtonIcon>
          <ButtonIcon>개설</ButtonIcon>
          <ButtonIcon>인증</ButtonIcon>
          <ButtonIcon>채팅</ButtonIcon>
          <ButtonIcon>Mypage</ButtonIcon>
        </ButtonWrap>
      </Footer>
    </React.Fragment>
  );
};

const Footer = styled.div`
  position: relative;
  transform: translateY(-100%);
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
