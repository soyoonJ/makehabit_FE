import React, { useState } from "react";

import { Grid, Text, Input, Button } from "../elements";

import ProgressBar from "../components/ProgressBar";
import NicknameModal from "../components/NicknameModal";

import { HiOutlinePencil } from "react-icons/hi";
const Mypage = () => {
  //닉네임 변경 모달 값 가져오기 (자식(CategoryModal) -> 부모(postWrite))
  const [nicknameValue, setNicknameValue] = useState("");

  const getData = (nicknameValue) => {
    setNicknameValue(nicknameValue);
  };

  //카테고리 팝업
  let [modalopen, setModalopen] = React.useState(false);
  //카테고리 팝업 열기
  const openModal = () => {
    setModalopen(true);
  };

  //카테고리 팝업 닫기
  const closeModal = () => {
    setModalopen(false);
  };
  return (
    <Grid>
      <Grid is_flex justifyContent="center" padding="100px 0 0 0">
        {/* <canvas width="150px" height="150px"> */}
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
        <Button _onClick={openModal}>
          닉네임 &nbsp;&nbsp;&nbsp;
          <HiOutlinePencil />
        </Button>
        <NicknameModal
          open={modalopen}
          close={closeModal}
          getData={getData}
        ></NicknameModal>
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
        <Button>나의 기록보기</Button>
      </Grid>
      <Grid padding="2% 5%">
        <Button>로그아웃</Button>
      </Grid>
    </Grid>
  );
};

export default Mypage;
