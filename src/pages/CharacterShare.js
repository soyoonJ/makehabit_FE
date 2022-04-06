import React from "react";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as characterActions } from "../redux/modules/character";
import { Grid, ContainerGrid, Button } from "../elements";
import { ReactComponent as CloseImg } from "../img/icon_close.svg";
import MetaTag from "../shared/MetaTag";

import styled from "styled-components";
import html2canvas from "html2canvas";

const CharacterShare = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(characterActions.getItemDB());
  }, []);

  const isEquip = useSelector((state) => state.character?.isEquip);
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");

  const Item = process.env.PUBLIC_URL + "/items/large";

  // 공유하기 기능
  async function shareCanvas() {
    // html2canvas 활용해서 canvas로 만들고 dataUrl 만들기
    const canvasElement = await html2canvas(
      document.getElementById("myCharacter")
    );
    const dataUrl = canvasElement.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
      new File([blob], "mycharacter.png", {
        type: blob.type,
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      files: filesArray,
    };
    // web share API 활용해서 공유하기
    navigator.share(shareData);
  }

  // 저장하기 기능
  const onHtmlToPng = () => {
    let url = "";
    html2canvas(document.getElementById("myCharacter")).then((canvas) => {
      url = canvas.toDataURL("image/png");
      // console.log("url", url);
      // 곧바로 저장하기!!!
      let link = document.createElement("a");
      document.body.appendChild(link);
      link.href = url;
      link.download = "mycharacter.png";
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <React.Fragment>
      <Grid height="100vh" bg="#F7F7F7">
        <MetaTag title="습관삼끼 | 내 캐릭터 보기" />

        <ContainerGrid bg="#fff" padding="2.48vh">
          <div style={{ position: "relative" }}>
            <p
              style={{
                margin: "0",
                textAlign: "center",
                fontSize: "2.6vh",
                fontWeight: "700",
                lineHeight: "3.41vh",
              }}
            >
              캐릭터 공유하기
            </p>
            <CloseImg
              fill="#707070"
              width="28"
              height="28"
              style={{ position: "absolute", right: "0", top: "0" }}
              onClick={() => {
                history.push("/mypage");
              }}
            />
          </div>
        </ContainerGrid>

        <CharacterWrap id="myCharacter">
          <ImgContainer>
            <ItemImg src={Item + equipBg?.itemImgUrl} />
            <ItemImg src={Item + equipColor?.itemImgUrl} />
            <ItemImg src={Item + equipClothes?.itemImgUrl} />
            <ItemImg src={Item + equipAcc?.itemImgUrl} />
            <ItemImg src={Item + equipEmotion?.itemImgUrl} />
          </ImgContainer>
          <img
            // src={process.env.PUBLIC_URL + "/images/logo_text_image.png"}
            src="/images/logo_text_image.svg"
            alt="logo"
            style={{
              height: "4.7vh",
              objectFit: "cover",
              overflowX: "hidden",
            }}
          />
        </CharacterWrap>

        <ContainerGrid bg="#F7F7F7">
          <div
            style={{
              textAlign: "center",
              fontSize: "2.37vh",
              fontWeight: "500",
              height: "100%",
              color: "#707070",
              lineHeight: "3.10vh",
              padding: "4.97vh 0",
            }}
          >
            습관삼끼에서 도전하는
            <br />
            멋진 나의 캐릭터를 공유해봐요!
          </div>

          <Buttons>
            <Button
              borderRadius="5px"
              border="1.5px solid #FF8B37"
              margin="0 0 2.25vh"
              bg="#fff"
              color="rgba(255, 139, 55, 1)"
              _onClick={onHtmlToPng}
            >
              이미지로 저장하기
            </Button>
            <Button
              bg="rgba(255, 139, 55, 1)"
              margin="0 0 1.89vh 0"
              _onClick={shareCanvas}
            >
              내 캐릭터 공유하기
            </Button>
          </Buttons>
        </ContainerGrid>
      </Grid>
    </React.Fragment>
  );
};

const CharacterWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 46vh;
  background: #fff;
  // 모바일 버전
  @media (min-width: 420px) {
    height: 48.5vh;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 48.5vh;
  position: relative;
  display: flex;
  justify-content: center;
`;

const ItemImg = styled.img`
  height: 100%;
  position: absolute;
  z-index: 1;
`;

const Buttons = styled.div`
  button {
    height: 7.938vh;
    line-height: 3.41vh;
    font-size: 2.6vh;
    font-weight: bold;
  }
`;

export default CharacterShare;
