import React from "react";
import { useReactPWAInstall } from "react-pwa-install";
import styled from "styled-components";
import icon from "../img/logo.png";
import { history } from "../redux/configureStore";

const PwaPrompt = (props) => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  const { _onClick } = props;
  const pwaClick = () => {
    pwaInstall({
      title: "습관삼끼 앱 다운받기",
      logo: icon,
      description: "나만의 캐릭터와 함께하는 30일 습관 형성 서비스",
    })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div>
      {supported() && !isInstalled() ? (
        <ButtonBox>
          <Button
            onClick={() => {
              pwaClick();
              _onClick();
              history.push("/login");
            }}
          >
            습관삼끼 시작하기
          </Button>
        </ButtonBox>
      ) : (
        <ButtonBox>
          <Button
            onClick={() => {
              _onClick();
              history.push("/login");
            }}
          >
            습관삼끼 시작하기
          </Button>
        </ButtonBox>
      )}
    </div>
  );
};

const ButtonBox = styled.div`
  position: fixed;
  bottom: 0;
  width: 420px;
  height: 75px;
  color: #fff;
  background-color: #ff8b37;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: default;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 420px) {
    width: 100vw;
  }
  z-index: 201;
`;

const Button = styled.button`
  width: 100%;
  background-color: #ff8b37;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: default;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: #fff;
  border: none;
`;

export default PwaPrompt;
