import React from "react";

import { Grid, Text, Button } from "../elements";
// import { actionCreators as challengeActions } from "../redux/modules/challenge";

import styled from "styled-components";
import { history } from "../redux/configureStore";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import LoginModal from "./LoginModal";

//버튼아이콘 Import
import { ReactComponent as HomeImg } from "../img/icon_home.svg";
import { ReactComponent as WriteImg } from "../img/icon_write.svg";
import { ReactComponent as FlagImg } from "../img/icon_flag.svg";
import { ReactComponent as ShopImg } from "../img/icon_shop.svg";
import { ReactComponent as MypageImg } from "../img/icon_mypage.svg";

const ButtonNavigation = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const [clickedTab, changeTab] = React.useState("home");

  console.log("버튼", clickedTab);
  //모달창에 접근하는 ref
  const modalRef = React.useRef();
  // console.log("모달ref!!!", modalRef);
  console.log("clickTab", clickedTab, clickedTab === "home");
  const confirmPage = () => {
    if (is_login) {
      // dispatch(challengeActions.setTab("navi"));
      // dispatch(challengeActions.naviChallengeDB());

      history.push(`/mychallenge/navi`);
    } else {
      // console.log("로그인");
      modalRef.current.openModal();
    }
  };
  const writePage = () => {
    console.log("writePage", is_login, clickedTab);
    if (is_login) {
      history.push(`/postwrite`);
    } else {
      modalRef.current.openModal();
    }
  };

  const characterPage = () => {
    // console.log("writePage", is_login);
    if (is_login) {
      history.push(`/character`);
    } else {
      modalRef.current.openModal();
    }
  };

  const myPage = () => {
    // console.log("writePage", is_login);
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
                  fill: clickedTab === "home" ? "#FF8B37" : "#9C9C9C",
                }}
              />
            </div>

            <div
              style={{
                color: clickedTab === "home" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "home" ? "600" : "400",
              }}
            >
              홈
            </div>
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              writePage();
            }}
          >
            <div>
              <WriteImg
                style={{
                  fill: clickedTab === "open" ? "#FF8B37" : "#9C9C9C",
                }}
              />
            </div>

            <div
              style={{
                color: clickedTab === "open" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "open" ? "600" : "400",
              }}
            >
              개설
            </div>
          </ButtonIcon>

          <ButtonIcon
            onClick={() => {
              confirmPage();
            }}
          >
            <FlagImg
              style={{
                fill: clickedTab === "confirm" ? "#FF8B37" : "#9C9C9C",
              }}
            ></FlagImg>
            <div
              style={{
                color: clickedTab === "confirm" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "confirm" ? "600" : "400",
              }}
            >
              인증
            </div>
          </ButtonIcon>
          {/* 채팅 추가 연결 필요 */}
          <ButtonIcon
            onClick={() => {
              characterPage();
            }}
          >
            <ShopImg
              style={{
                fill: clickedTab === "character" ? "#FF8B37" : "#9C9C9C",
              }}
            ></ShopImg>
            <div
              style={{
                color: clickedTab === "character" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "character" ? "600" : "400",
              }}
            >
              캐릭터샵
            </div>
          </ButtonIcon>
          <ButtonIcon
            onClick={() => {
              myPage();
            }}
          >
            <div>
              <MypageImg
                style={{
                  fill: clickedTab === "mypage" ? "#FF8B37" : "#9C9C9C",
                }}
              ></MypageImg>
            </div>

            <div
              style={{
                color: clickedTab === "mypage" ? "#1D1B1B" : "#9C9C9C",
                fontWeight: clickedTab === "mypage" ? "600" : "400",
              }}
            >
              내 페이지
            </div>
          </ButtonIcon>
        </ButtonWrap>
      </Footer>

      <LoginModal ref={modalRef}>
        <Grid padding="30px 30px 0px 30px">
          <Text size="20" bold alignCenter>
            앗 로그인이 필요해요!
          </Text>
          <Button margin="10px 0px" _onClick={() => history.push("/login")}>
            로그인하러가기
          </Button>
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: auto;
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

export default ButtonNavigation;
