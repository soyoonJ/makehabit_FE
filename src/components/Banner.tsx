import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
// import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as LeftIcon } from "../img/icon_left.svg";
import { ReactComponent as RightIcon } from "../img/icon_right.svg";
import { render } from "@testing-library/react";

const Banner = () => {
  const [bannerIndex, setBannerIndex] = React.useState<number>(0);

  const imgURL = [
    "/banner/mainbanner_01.webp",
    "/banner/mainbanner_02.webp",
    "/banner/mainbanner_03.webp",
    "/banner/mainbanner_04.webp",
    "/banner/mainbanner_05.webp",
  ];

  const linkUrl = [
    "https://docs.google.com/forms/d/e/1FAIpQLSfAsQRKY6RxcAZ2tP9cC-kmhyQDKrsMJ4h-QICdfq-nlYUW1w/viewform",
    "https://witty-board-2e4.notion.site/e0fe80c96fe74d53adbef6e7e87f74ea",
    "/character",
    "https://witty-board-2e4.notion.site/6cd0b4633c4a4998bc15b1668429c6d1",
    "/category/study",
  ];
  // 이전 버튼 클릭시 배너의 인덱스를 -1, 인덱스가 처음이면 마지막으로 돌아가기.
  const clickPrev = () => {
    if (bannerIndex <= 0) {
      setBannerIndex(imgURL.length - 1);
      return;
    }
    setBannerIndex(bannerIndex - 1);
  };
  // 다음 버튼 클릭시 배너의 인덱스를 +1, 인덱스가 마지막이면 처음인 0으로 돌아가기.
  const clickNext = () => {
    if (bannerIndex >= imgURL.length - 1) {
      setBannerIndex(0);
      return;
    }
    setBannerIndex(bannerIndex + 1);
  };

  // 아래 원형 클릭시에도 인덱스를 바꿔줌
  const clickCircle = (i: number) => {
    setBannerIndex(i);
  };

  // useEffect와 setInterval을 활용해 일정시간마다 자동으로 슬라이더가 넘어가기 구현
  React.useEffect(() => {
    const slider = setInterval(
      () =>
        setBannerIndex((value: number) =>
          value === imgURL.length - 1 ? 0 : value + 1
        ),
      3000
    );
    return () => clearInterval(slider);
  }, []);
  return (
    <Container>
      <LeftIcon
        onClick={clickPrev}
        style={{
          left: "10px",
          position: "absolute",
          cursor: "pointer",
          zIndex: "3",
        }}
        width="20"
        height="20"
        // alt="left icon"
        fill="#000"
      />
      <Carousel bannerIndex={bannerIndex}>
        {imgURL.map((e, i) => (
          <ContentBox style={{ display: "flex" }} index={i} key={i}>
            <Content style={{ display: "flex" }}>
              {i === 0 || i === 1 || i === 3 ? (
                <Img
                  imgURL={imgURL[i]}
                  onClick={() => {
                    window.open(`${linkUrl[i]}`, "_blank");
                  }}
                  index={i}
                ></Img>
              ) : (
                <Img
                  imgURL={imgURL[i]}
                  onClick={() => {
                    history.push(`${linkUrl[i]}`);
                  }}
                  index={i}
                ></Img>
              )}
            </Content>
          </ContentBox>
        ))}
      </Carousel>
      <CircleBox>
        {imgURL.map((e, i) => (
          <Circle
            key={i}
            onClick={() => {
              clickCircle(i);
            }}
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: i === bannerIndex ? "#FF8B37" : "#fff",
              transform: "matrix(1, 0, 0, -1, 0, 0)",
            }}
          ></Circle>
        ))}
      </CircleBox>

      <RightIcon
        onClick={clickNext}
        style={{
          right: "10px",
          position: "absolute",
          cursor: "pointer",
          zIndex: "3",
        }}
        width="20"
        height="20"
        // alt="right icon"
        fill="#000"
      />
    </Container>
  );
};

// 컨테이너에서 화살표색, 배경색 지정
const Container = styled.div`
  width: 100%;
  max-width: 420px;
  height: 175px;
  margin: 25px 0;
  background: black;
  font-size: 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  color: #e9e9e9;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
  position: relative;
`;
const Carousel = styled.div<{ bannerIndex: number }>`
  display: flex;

  @media only screen and (min-width: 420px) {
    transform: translate(
      ${(props) => {
        return -(props.bannerIndex * 420) + "px";
      }}
    );
  }

  @media (max-width: 420px) {
    transform: translate(
      ${(props) => {
        return -(props.bannerIndex * 100) + "vw";
      }}
    );
  }

  transition: all 0.2s;
`;
const ContentBox = styled.div<{ index: number }>`
  font-size: 22px;
  height: 175px;
  font-weight: 700;
  line-height: 60px;

  @media (min-width: 420px) {
    width: 420px;
  }

  @media (max-width: 420px) {
    width: 100vw;
  }
`;
const Content = styled.div`
  position: relative;
  width: 100%;
  padding: 0px;
`;
const CircleBox = styled.div`
  width: auto;
  display: flex;
  position: absolute;
  bottom: 11px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Circle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background: #dedede;
  border-radius: 100%;
  margin: 0px 5px;
  cursor: pointer;
`;

const Img = styled.div<{ imgURL?: string; index?: number }>`
  background-image: url(${(props) => props.imgURL});

  @media (min-width: 420px) {
    width: 420px;
  }

  @media (max-width: 420px) {
    width: 100vw;
  }
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 2;
`;
export default Banner;
