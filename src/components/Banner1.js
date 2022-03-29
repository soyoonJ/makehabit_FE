import React from "react";
import styled from "styled-components";
// import { useDispatch, useSelector } from "react-redux";

const Banner1 = () => {
  // const dispatch = useDispatch();
  //
  // 로컬스토리지에서 유저네임 가져오기
  // const loginUserName = localStorage.getItem("loginUserName");

  // 배너인덱스를 useState로 관리
  const [bannerIndex, setBannerIndex] = React.useState(0);

  // map돌릴때 쓰일 imgUrl
  // const imgURL = ["/banner/mainbanner_01.webp", "/banner/mainbanner_02.webp"];
  // const imgURL = [
  //   "/banner/mainbanner_01.png",
  //   "/banner/mainbanner_02.png",
  //   "/banner/mainbanner_03.png",
  //   "/banner/mainbanner_04.png",
  //   "/banner/mainbanner_05.png",
  // ];
  const imgURL = [
    "/banner/mainbanner_01.webp",
    "/banner/mainbanner_02.webp",
    "/banner/mainbanner_03.webp",
    "/banner/mainbanner_04.webp",
    "/banner/mainbanner_05.webp",
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
  const clickCircle = (i) => {
    setBannerIndex(i);
  };

  // useEffect와 setInterval을 활용해 일정시간마다 자동으로 슬라이더가 넘어가기 구현
  React.useEffect(() => {
    const slider = setInterval(
      () =>
        setBannerIndex((value) =>
          value === imgURL.length - 1 ? 0 : value + 1
        ),
      3000
    );
    return () => clearInterval(slider);
  }, []);

  return (
    <Container>
      <IconImg
        src={"/images/icon_left.svg"}
        onClick={clickPrev}
        style={{ left: "10px" }}
        alt="left icon"
      />
      <Carousel bannerIndex={bannerIndex}>
        {imgURL.map((e, i) => (
          <ContentBox style={{ display: "flex" }} index={i} key={i}>
            <Content style={{ display: "flex" }}>
              {/* <TextBox>
                <h2
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "gmarketBold",
                    fontSize: "38px",
                    margin: "60px 0 0 0",
                    color: i === 1 ? "#fff8ca" : i === 3 ? "white" : "black",
                  }}
                >
                  {bannerMent[i][0]}
                </h2>
                <p style={{ fontSize: "20px", margin: " 0px 10px 10px 0px " }}>
                  {bannerMent[i][1]}
                </p>
                <ButtonBox>
                  <Button
                    // style={{ position: "absolute", left: "200px" }}
                    style={{
                      justifyContent: "center",
                    }}
                    width="250px"
                    _onClick={() => {
                      // console.log("Click! onclick")
                      // dispatch(postActions.getPostDB(bannerMent[i][3]));
                    }}
                  >
                    {" "}
                    {bannerMent[i][2]}
                  </Button>
                </ButtonBox>
              </TextBox> */}
              <Img imgURL={imgURL[i]} index={i}></Img>
              {/* {i === 0 && (
                <h1
                  style={{
                    fontFamily: "tvnBold",
                    fontSize: "40px",
                    color: "#1b35d2",
                  }}
                >
                  {loginUserName
                    ? `Hi! ${loginUserName} 롷`
                    : "Let's study Eng 롷"}
                </h1>
              )} */}
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
              width: i === bannerIndex ? "32px" : null,
              borderRadius: i === bannerIndex ? "12px" : null,
              transition: "width 0.1s",
            }}
          ></Circle>
        ))}
      </CircleBox>
      <IconImg
        src={"/images/icon_right.svg"}
        onClick={clickNext}
        style={{ right: "10px" }}
        alt="right icon"
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
  bottom: 10%;
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

const Img = styled.div`
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
const IconImg = styled.img`
  position: absolute;
  cursor: pointer;
  z-index: 3;
`;

export default Banner1;
