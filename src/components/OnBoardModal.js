import React from "react";
// import { Text, Grid } from "../elements";
import styled from "styled-components";
import PwaPrompt from "./PwaPrompt";
// import GridContainer from "../elements/ContainerGrid";
const OnBoardModal = (props) => {
  const { onClose } = props;
  //배너
  const [bannerIndex, setBannerIndex] = React.useState(0);

  const imgURL = [
    "/onBoard/onBoarding_01.png",
    "/onBoard/onBoarding_02.png",
    "/onBoard/onBoarding_03.png",
  ];

  // 아래 원형 클릭시에도 인덱스를 바꿔줌
  const clickCircle = (i) => {
    setBannerIndex(i);
  };

  // 다음 버튼 클릭시 배너의 인덱스를 +1, 인덱스가 마지막이면 처음인 0으로 돌아가기.
  const clickNext = () => {
    if (bannerIndex >= imgURL.length - 1) {
      setBannerIndex(0);
      return;
    }
    setBannerIndex(bannerIndex + 1);
  };

  return (
    <Container>
      <section>
        <ModalContent>
          <Carousel bannerIndex={bannerIndex}>
            {imgURL.map((e, i) => (
              <ContentBox style={{ display: "flex" }} index={i} key={i}>
                <Content style={{ display: "flex" }}>
                  <Img imgURL={imgURL[i]} index={i}></Img>
                </Content>
              </ContentBox>
            ))}
          </Carousel>
          {/* <CircleBox>
            {imgURL.map((e, i) => (
              <Circle
                key={i}
                onClick={() => {
                  clickCircle(i);
                }}
                style={{
                  // width: i === bannerIndex ? "32px" : null,
                  // borderRadius: i === bannerIndex ? "12px" : null,
                  // transition: "width 0.1s",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: i === bannerIndex ? "#FF8B37" : "#E0E0E0",
                  transform: "matrix(1, 0, 0, -1, 0, 0)",
                }}
              ></Circle>
            ))}
          </CircleBox> */}
        </ModalContent>
        {bannerIndex === imgURL.length - 1 ? (
          <PwaPrompt _onClick={onClose} />
        ) : (
          <ButtonBox>
            <Button
              onClick={() => {
                clickNext();
              }}
            >
              다음 보기
            </Button>
          </ButtonBox>
        )}
      </section>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 420px;

  background: rgba(0, 0, 0, 0.6);
  z-index: 101;
  display: flex;

  section {
    width: 100%;
    height: 100%;
    align-self: end;
    background-color: transparent !important;
  }
`;

const ModalContent = styled.div`
  height: 100%;
  width: 420px;
  background-color: #fff;
  position: fixed;
  top: 0;
  overflow: hidden;
  z-index: 200;
`;

const Carousel = styled.div`
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

const ContentBox = styled.div`
  font-size: 22px;
  height: 100vh;
  width: 80%;
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
const TitleTextBox = styled.div``;
const TitleText = styled.div`
  font-size: 2.6vh;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.75rem;
`;

const CircleBox = styled.div`
  width: auto;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Circle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background: #dedede;
  border-radius: 50%;
  margin: 0px 12.5px;
  cursor: pointer;
`;

const Img = styled.div`
  background-image: url(${(props) => props.imgURL});

  @media (min-width: 420px) {
    width: 420px;
    margin: 0 2.5rem;
  }

  @media (max-width: 420px) {
    width: 100vw;
    margin: 0 10vw;
  }
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
`;

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

export default OnBoardModal;
