import React, { useState, useRef } from "react";

import { Grid, Text, Input, Button, ContainerGrid } from "../elements";
// import ProgressBar from "../components/ProgressBar";
// import NicknameModal from "../components/NicknameModal";
import Modal from "../components/Modal";
import ButtonNavigation from "../components/ButtonNavigation";
// import CharacterContainer from "../components/CharacterContainer";
// import Character from "../redux/modules/character";
import MetaTag from "../shared/MetaTag";
// import Spinner from "../shared/Spinner";

// import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as characterActions } from "../redux/modules/character";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// import { HiOutlinePencil } from "react-icons/hi";
import { ReactComponent as RightButton } from "../img/icon_right.svg";
import LoginModal from "../components/LoginModal";

import styled from "styled-components";

const Mypage = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user?.user_info);
  // console.log(userInfo);

  React.useEffect(() => {
    dispatch(characterActions.getItemDB());
    dispatch(userActions.getInfoDB());
    // console.log("오냐냐냐냐냐");
  }, []);

  const isEquip = useSelector((state) => state.character?.isEquip);
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");

  // console.log(
  //   "equip확인",
  //   isEquip,
  //   equipBg?.itemImgUrl,
  //   equipColor?.itemImgUrl,
  //   equipClothes?.itemImgUrl,
  //   equipAcc?.itemImgUrl
  // );

  const Item = process.env.PUBLIC_URL + "/items/large";

  //닉네임 가져오기
  const nickName = useSelector((state) => state.user?.user?.nickname);
  // console.log("닉네임", nickName);

  //자식 함수 접근하는 Ref
  const childRef = useRef();

  //로그인모달창에 접근하는 ref
  const loginModal = React.useRef();
  const is_token = localStorage.getItem("token") ? true : false;
  // 로그인 상태 아닐 경우 튕겨내기
  React.useEffect(() => {
    if (!is_token) {
      loginModal.current.openModal();
    }
  }, []);

  return (
    <Container>
      <MetaTag title="습관삼끼 | 마이페이지" />
      {/* {isLoading ? <Spinner /> : ""} */}

      <ContainerGrid>
        <Grid margin="10% 0% 0% 0%">
          <CharacterWrap>
            {/* 지금 테두리 이상함 공유하기 창 따로 띄우는게 나을듯? */}
            <ImgContainer id="myCharacter">
              <ItemImg src={Item + equipBg?.itemImgUrl} />
              <ItemImg src={Item + equipColor?.itemImgUrl} />
              <ItemImg src={Item + equipClothes?.itemImgUrl} />
              <ItemImg src={Item + equipAcc?.itemImgUrl} />
              <ItemImg src={Item + equipEmotion?.itemImgUrl} />
            </ImgContainer>

            {/* {viewBg && (
              <ImgContainer>
                <ItemImg
                  src={Item + viewBg}
                  ref={selectedBg}
                  alt={viewBg}
                ></ItemImg>
              </ImgContainer>
            )} */}
          </CharacterWrap>
          {/* 닉네임 / 닉네임 변경 */}
          <Grid
            is_flex
            // margin="3px"
            textAlign="center"
            justifyContent="center"
            // padding="2% 5%"
          >
            {/* 닉네임 수정 */}
            <Button
              bg="white"
              color="black"
              // _onClick={() => {
              //   // console.log("onClick!", childRef, childRef.current);
              //   childRef.current.openModal();
              // }}
            >
              <Text
                weight="700"
                size="2.6vh"
                lineHeight="3.41vh"
                margin="2.51vh 0"
              >
                {nickName}
              </Text>
            </Button>

            {/* <Modal ref={childRef}>
              <Grid>
                <Grid is_flex height="50px">
                  <Input></Input>
                  <Button width="70px">중복확인</Button>
                </Grid>
                <Grid is_flex height="50px" justifyContent="center">
                  <Button width="70px" padding="3%" margin="3%">
                    확인
                  </Button>
                  <Button
                    width="70px"
                    padding="3%"
                    margin="3%"
                    _onClick={() => {
                      childRef.current.closeModal();
                    }}
                  >
                    취소
                  </Button>
                </Grid>
              </Grid>
            </Modal> */}
          </Grid>
          {/* 레벨 / 남은 경험치*/}
          {/* <Grid is_flex textAlign="center">
            <Text>Lv.1</Text>
            <Text>다음 레벨까지 100경험치</Text>
          </Grid> */}
          {/* 경험치 바 */}
          {/* <Grid is_flex justifyContent="center" padding="5%">
            <ProgressBar />
          </Grid> */}
        </Grid>
      </ContainerGrid>

      {/* 통계치 */}
      <ContainerGrid>
        <UserScore>
          <div>
            총 인증횟수<span>{userInfo?.proofCnt}회</span>
          </div>
          <div>
            챌린지 참가<span>{userInfo?.participateCnt}회</span>
          </div>
        </UserScore>
      </ContainerGrid>

      {/* 공유하기 배너 */}
      <Grid>
        <ShareBox>
          <Grid margin="0px 21px">
            <Text
              alignLeft
              margin="19px 0px 5px 0px"
              color="white"
              size="1.25rem"
              weight="700"
            >
              나만의 캐릭터를 자랑해보세요!
            </Text>
            <Text
              alignLeft
              margin="7px 0px 19px 0px"
              color="white"
              size="0.813rem"
            >
              내 캐릭터의 이미지를 저장할 수 있어요
            </Text>
          </Grid>
          <div>
            <ShareButton>
              <p
                style={{
                  margin: "auto",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "white",
                  textAlign: "center",
                }}
                onClick={() => {
                  history.push("/charactershare");
                }}
              >
                공유하기
              </p>
            </ShareButton>
          </div>
        </ShareBox>
      </Grid>

      {/* 하단 메뉴 */}
      {/* <Grid>
        <TestBox>
          <Text bold size="2.13vh" alignLeft>
            좋아요 모아보기
          </Text>
          <RightButton
            style={{
              alignItems: "flex-end",
              margin: "auto",
              fill: "#707070",
            }}
          />
        </TestBox>
      </Grid> */}
      <Grid>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfAsQRKY6RxcAZ2tP9cC-kmhyQDKrsMJ4h-QICdfq-nlYUW1w/viewform"
          target="_blank"
          rel="noreferrer"
          style={{ all: "unset" }}
        >
          <TestBox>
            <Text bold size="2.13vh" alignLeft>
              습관삼끼 피드백
            </Text>
            <RightButton
              fill="#9C9C9C"
              style={{
                alignItems: "flex-end",
                margin: "auto",
              }}
            />
          </TestBox>
        </a>
      </Grid>

      <Grid>
        <TestBox
          onClick={() => {
            // dispatch(challengeActions.setTab("feed"));
            history.push("/ranking");
          }}
        >
          <Text bold size="2.13vh" alignLeft>
            나의 랭킹보기
          </Text>
          <RightButton
            fill="#9C9C9C"
            style={{
              alignItems: "flex-end",
              margin: "auto",
              fill: "#9C9C9C",
            }}
          />
        </TestBox>
      </Grid>

      <Grid>
        <TestBox
          onClick={() => {
            // dispatch(challengeActions.setTab("feed"));
            history.push("/mychallenge/feed");
          }}
        >
          <Text bold size="2.13vh" alignLeft>
            나의 기록보기
          </Text>

          <RightButton
            fill="#9C9C9C"
            style={{
              alignItems: "flex-end",
              margin: "auto",
            }}
          />
        </TestBox>
      </Grid>
      <Grid>
        <TestBox
          onClick={() => {
            window.confirm(
              "로그아웃 하시면 캐릭터 꾸미기나 챌린지 참여가 제한됩니다😢\n정말 로그아웃 하시겠어요?"
            )
              ? dispatch(userActions.logoutDB())
              : console.log("취소");
          }}
        >
          <Text bold size="2.13vh" alignLeft>
            로그아웃
          </Text>
          <RightButton
            fill="#9C9C9C"
            style={{
              alignItems: "flex-end",
              margin: "auto",
            }}
          />
        </TestBox>
      </Grid>
      <LoginModal ref={loginModal} in_page />
      <ButtonNavigation />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 150px;
`;

const CharacterWrap = styled.div`
  width: 53.8%;
  height: 26.06vh;
  align-items: center;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
`;
const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
`;

const UserScore = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4.1%;
  margin-bottom: 2.8vh;

  & > div {
    background: #f7f7f7;
    border-radius: 5px;
    font-weight: 600;
    font-size: 1.89vh;
    line-height: 1.89vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.01vh 1.66vh;

    & > span {
      font-weight: 600;
      color: #6825d6;
    }
  }
`;

const ShareBox = styled.button`
  margin: "3px 0px";
  width: 100%;
  height: 100%;
  background-color: #ff8b37;
  padding: 3px;
  align-items: center;
  display: flex;
  border: none;
`;

const ShareButton = styled.div`
  border-radius: 50px;
  /* border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px; */
  display: flex;
  width: 92px;
  height: 40px;
  background-color: #6825d6;
  margin-right: 17px;
`;

const TestBox = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  align-items: left;
  height: 4.188rem;
  width: 100%;
  border: none;
  background-color: white;
  font-size: 1.25rem;
  margin-top: 2%;
  padding: 0% 5%;
  border-bottom: 1.5px #e0e0e0 solid;
`;

export default Mypage;
