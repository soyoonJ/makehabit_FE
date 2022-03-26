import React from "react";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as characterActions } from "../redux/modules/character";
import { ContainerGrid, Button } from "../elements";
import { ReactComponent as CheckImg } from "../img/icon_check.svg";
import MetaTag from "../shared/MetaTag";

import styled from "styled-components";
import html2canvas from "html2canvas";

const CharacterSave = () => {
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

  // const capture = () => {
  //   html2canvas(document.querySelector("myCharacter")).then(function(canvas) {
  //     document.body.appendChild(canvas);
  //   });
  // }

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

  // 카카오 공유 시도
  // const kakaoShare = () => {
  //   let url = "";
  //   html2canvas(document.getElementById("myCharacter")).then((canvas) => {
  //     url = canvas.toDataURL("image/png");

  //     window.Kakao.Link.sendDefault({
  //       objectType: "feed",
  //       content: {
  //         title: "습관삼끼",
  //         description: "작심삼일도 열번하면 30일이다!!",
  //         imageUrl: url,
  //         link: {
  //           webUrl: "https://makehabit.shop/character",
  //           mobileWebUrl: "https://makehabit.shop",
  //         },
  //       },
  //       buttons: [
  //         {
  //           title: "내 캐릭터 만들러 가기",
  //           link: {
  //             webUrl: "https://makehabit.shop/character",
  //             mobileWebUrl: "https://makehabit.shop",
  //           },
  //         },
  //       ],
  //     });
  //   });
  // };

  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 캐릭터꾸미기" />

      <ContainerGrid>
        <CharacterWrap id="myCharacter">
          <ImgContainer>
            <ItemImg src={Item + equipBg?.itemImgUrl} />
            <ItemImg src={Item + equipColor?.itemImgUrl} />
            <ItemImg src={Item + equipClothes?.itemImgUrl} />
            <ItemImg src={Item + equipAcc?.itemImgUrl} />
            <ItemImg src={Item + equipEmotion?.itemImgUrl} />
          </ImgContainer>
        </CharacterWrap>

        <Circle>
          <CheckImg fill="#6825D6" width="4.03vh" height="4.03vh" />
        </Circle>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.6vh",
            fontWeight: "700",
            lineHeight: "3.414vh",
            marginBottom: "2.6vh",
          }}
        >
          내 캐릭터가 저장되었어요!
        </h2>
        <div
          style={{
            textAlign: "center",
            color: "#707070",
            fontSize: "1.66vh",
            fontWeight: "600",
            lineHeight: "2.65vh",
          }}
        >
          꾸준히 챌린지에 도전하며 포인트를 모아
          <br />
          다양한 아이템으로 나를 꾸며봐요!
        </div>

        <Buttons>
          <Button
            fontSize="2.6vh"
            fontWeight="bold"
            height="7.93vh"
            bg="rgba(255, 139, 55, 1)"
            margin="0 0 1.89vh 0"
            _onClick={() => {
              history.push("/mypage");
            }}
          >
            확인
          </Button>
          <Button
            borderRadius="5px"
            border="1px solid #FF8B37"
            fontSize="2.13vh"
            fontWeight="bold"
            height="6.16vh"
            bg="#fff"
            color="rgba(255, 139, 55, 1)"
            _onClick={shareCanvas}
            // _onClick={onHtmlToPng}
          >
            내 캐릭터 공유하기
          </Button>
        </Buttons>
      </ContainerGrid>
    </React.Fragment>
  );
};

const CharacterWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 46vh;
  margin-bottom: 4.97vh;
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

const Circle = styled.div`
  width: 7.11vh;
  height: 7.11vh;
  border: 3px solid #6825d6;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto 2.96vh auto;
`;

const Buttons = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  width: 90%;
  max-width: 380px;
  margin: 0 auto 2.36vh auto;
`;

export default CharacterSave;
