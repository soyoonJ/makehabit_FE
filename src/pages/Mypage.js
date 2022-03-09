import React, { useState, useRef } from "react";

import { Grid, Text, Input, Button } from "../elements";

import ProgressBar from "../components/ProgressBar";
import NicknameModal from "../components/NicknameModal";
import Modal from "../components/Modal";
import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlinePencil } from "react-icons/hi";
import ButtonNavigation from "../components/ButtonNavigation";

const Mypage = () => {
  const dispatch = useDispatch();

  //자식 함수 접근하는 Ref
  const childRef = useRef();
  return (
    <Grid>
      <Grid is_flex justifyContent="center" padding="100px 0 0 0">
        {/* <canvas width="100%" height="150px"> */}
        <img
          src="https://media.istockphoto.com/vectors/man-face-character-people-work-profile-image-vector-id931879564"
          width="150px"
          height="150px"
          alt=""
        />
        {/* </canvas> */}
      </Grid>
      {/* 닉네임 / 닉네임 변경 */}
      <Grid is_flex textAlign="center" justifyContent="center" padding="2% 5%">
        <Button
          _onClick={() => {
            console.log("onClick!", childRef, childRef.current);
            childRef.current.openModal();
          }}
        >
          닉네임 &nbsp;&nbsp;&nbsp;
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
      <Grid padding="2% 5%">
        <Button>내 캐릭터 꾸미기</Button>
      </Grid>
      <Grid padding="2% 5%">
        <Button>좋아요 모아보기</Button>
      </Grid>
      <Grid padding="2% 5%">
        <Button>문의 FAQ</Button>
      </Grid>
      <Grid padding="2% 5%">
        <Button
          _onClick={() => {
            dispatch(challengeActions.setTab(null));
            history.push("/mychallenge/feed");
          }}
        >
          나의 기록보기
        </Button>
      </Grid>
      <Grid padding="2% 5% 50px 5%">
        <Button
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
      <ButtonNavigation />
    </Grid>
  );
};

export default Mypage;
