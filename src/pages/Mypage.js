import React, { useState, useRef } from "react";

import { Grid, Text, Input, Button, ContainerGrid } from "../elements";

import ProgressBar from "../components/ProgressBar";
import NicknameModal from "../components/NicknameModal";
import Modal from "../components/Modal";
import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlinePencil } from "react-icons/hi";
import ButtonNavigation from "../components/ButtonNavigation";
import CharacterContainer from "../components/CharacterContainer";
import Character from "../redux/modules/character";
import styled from "styled-components";
import { actionCreators as characterActions } from "../redux/modules/character";

const Mypage = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(characterActions.getItemDB());

    console.log("오냐냐냐냐냐");
  }, []);

  const isEquip = useSelector((state) => state.character?.isEquip);
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");

  console.log(
    "equip확인",
    isEquip,
    equipBg?.itemImgUrl,
    equipColor?.itemImgUrl,
    equipClothes?.itemImgUrl,
    equipAcc?.itemImgUrl
  );

  const Item = process.env.PUBLIC_URL + "/items/large";

  //닉네임 가져오기
  const nickName = useSelector((state) => state.user?.user.nickname);
  console.log("닉네임", nickName);

  //자식 함수 접근하는 Ref
  const childRef = useRef();
  return (
    <div>
      <ContainerGrid>
        <Grid margin="10% 0%">
          <CharacterWrap>
            <ImgContainer>
              <ItemImg src={Item + equipBg?.itemImgUrl} />
              <ItemImg src={Item + equipColor?.itemImgUrl} />
              <ItemImg src={Item + equipClothes?.itemImgUrl} />
              <ItemImg src={Item + equipAcc?.itemImgUrl} />
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
            textAlign="center"
            justifyContent="center"
            padding="2% 5%"
          >
            <Button
              bg="white"
              color="black"
              _onClick={() => {
                // console.log("onClick!", childRef, childRef.current);
                childRef.current.openModal();
              }}
            >
              {nickName} &nbsp;&nbsp;&nbsp;
              <HiOutlinePencil />
            </Button>

            <Modal ref={childRef}>
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
            </Modal>
          </Grid>

          {/* 레벨 / 남은 경험치*/}
          <Grid is_flex textAlign="center">
            <Text>Lv.1</Text>
            <Text>다음 레벨까지 100경험치</Text>
          </Grid>
          {/* 경험치 바 */}
          <Grid is_flex justifyContent="center" padding="5%">
            <ProgressBar />
          </Grid>

          <Grid>
            <ShareBox>나만의 캐릭터를 자랑해보세요!</ShareBox>
          </Grid>
          <Grid>
            <Button
              margin="1px 0px"
              fontSize="1.25rem"
              height="4.188rem"
              bg="white"
              borderRadius="0px"
              color="black"
            >
              좋아요 모아보기
            </Button>
          </Grid>
          <Grid>
            <Button
              margin="1px 0px"
              fontSize="1.25rem"
              height="4.188rem"
              bg="white"
              borderRadius="0px"
              color="black"
            >
              문의 FAQ
            </Button>
          </Grid>
          <Grid>
            <Button
              margin="1px 0px"
              fontSize="1.25rem"
              height="4.188rem"
              bg="white"
              borderRadius="0px"
              color="black"
              _onClick={() => {
                // dispatch(challengeActions.setTab("feed"));
                history.push("/mychallenge/feed");
              }}
            >
              나의 기록보기
            </Button>
          </Grid>
          <Grid>
            <Button
              margin="1px 0px"
              fontSize="1.25rem"
              height="4.188rem"
              bg="white"
              borderRadius="0px"
              color="black"
              _onClick={() => {
                window.confirm(
                  "로그아웃 하시면 캐릭터 꾸미기나 챌린지 참여가 제한됩니다😢\n정말 로그아웃 하시겠어요?"
                )
                  ? dispatch(userActions.logoutDB())
                  : console.log("취소");
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </ContainerGrid>
      <ButtonNavigation />
    </div>
  );
};

const CharacterWrap = styled.div`
  width: 300px;
  height: 300px;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  margin: auto;
`;

const ImgContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
`;
const ItemImg = styled.img`
  height: 100%;
  position: absolute;
  /* z-index: 1; */
  border-radius: 5px;
`;

const ShareBox = styled.div`
  margin: "1px 0px";
  height: "200px";
  background-color: #ff8b37;
`;
export default Mypage;
