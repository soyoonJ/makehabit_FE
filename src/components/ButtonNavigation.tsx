import React from "react";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";

import { ReactComponent as HomeImg } from "../img/icon_home.svg";
import { ReactComponent as WriteImg } from "../img/icon_write.svg";
import { ReactComponent as FlagImg } from "../img/icon_flag.svg";
import { ReactComponent as ShopImg } from "../img/icon_shop.svg";
import { ReactComponent as MypageImg } from "../img/icon_mypage.svg";

const ButtonNavigation = () => {
  const { pathname } = useLocation();

  const is_login = useSelector((state:any) => state.user.is_login);

  interface modalProps {
    openModal: ()=>void,
    closeModal: ()=>void,
  }
  const modalRef = React.useRef<modalProps>();

  const confirmPage = () => {
    if (is_login) {
      history.push(`/mychallenge/navi`);
    } else {
      modalRef.current.openModal();
    }
  };
  const writePage = () => {
    if (is_login) {
      history.push(`/postwrite`);
    } else {
      modalRef.current.openModal();
    }
  };

  const characterPage = () => {
    if (is_login) {
      history.push(`/character`);
    } else {
      modalRef.current.openModal();
    }
  };

  const myPage = () => {
    if (is_login) {
      history.push(`/mypage`);
    } else {
      modalRef.current.openModal();
    }
  };
  return (
    <React.Fragment>
      <Footer>
        <GradientBox />
        <ButtonWrap>
          <ButtonIcon
            onClick={() => {
              history.push("/");
            }}
          >
            <div>
              <HomeImg
                style={{
                  fill: pathname === "/" ? "#FF8B37" : "#9C9C9C",
                }}
              />
            </div>

            <IconText selected={pathname === "/"}>홈</IconText>
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              writePage();
            }}
          >
            <div>
              <WriteImg
                style={{
                  fill: pathname === "/postwrite" ? "#FF8B37" : "#9C9C9C",
                }}
              />
            </div>

            <IconText selected={pathname === "/postwrite"}>개설</IconText>
          </ButtonIcon>

          <ButtonIcon
            onClick={() => {
              confirmPage();
            }}
          >
            <div>
              <FlagImg
                style={{
                  fill:
                    pathname === "/mychallenge/navi" ||
                    pathname === "/mychallenge/feed"
                      ? "#FF8B37"
                      : "#9C9C9C",
                }}
              ></FlagImg>
            </div>

            <IconText
              selected={
                pathname === "/mychallenge/navi" ||
                pathname === "/mychallenge/feed"
              }
            >
              인증
            </IconText>
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              characterPage();
            }}
          >
            <div>
              <ShopImg
                style={{
                  fill: pathname === "/character" ? "#FF8B37" : "#9C9C9C",
                }}
              ></ShopImg>
            </div>

            <IconText selected={pathname === "/character"}>캐릭터샵</IconText>
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              myPage();
            }}
          >
            <div>
              <MypageImg
                style={{
                  fill: pathname === "/mypage" ? "#FF8B37" : "#9C9C9C",
                }}
              ></MypageImg>
            </div>

            <IconText selected={pathname === "/mypage"}>내 페이지</IconText>
          </ButtonIcon>
        </ButtonWrap>
      </Footer>

      <LoginModal ref={modalRef} in_page></LoginModal>
    </React.Fragment>
  );
};

const Footer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 420px;
  z-index: 99;
`;

const GradientBox = styled.div`
  width: 100%;
  max-width: 420px;
  height: 2.72vh;
  background: linear-gradient(
    360deg,
    rgba(222, 222, 222, 0.43) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const ButtonWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
  height: 11.84vh;
  background-color: #fff;
`;

const ButtonIcon = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;

  & > div {
    &:nth-child(2) {
      font-size: 0.813rem;
      line-height: 1.063rem;
      letter-spacing: -0.005rem;
    }
  }
`;

const IconText = styled.div<{selected: boolean}>`
  color: ${(props) => (props.selected ? "#1D1B1B" : "#9C9C9C")};
  font-weight: ${(props) => (props.selected ? "600" : "#400")};
`;

export default ButtonNavigation;
