import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";

import CategoryModal from "../components/CategoryModal";

import styled from "styled-components";

const PostWrite = () => {
  //카테고리 값 가져오기 (자식(CategoryModal) -> 부모(postWrite))
  const [categoryValue, setCategoryValue] = useState(0);

  const getData = (categoryValue) => {
    setCategoryValue(categoryValue);
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
  console.log("postWrite", categoryValue);

  //이미지 업로드
  const [fileImage, setFileImage] = React.useState(
    "https://user-images.githubusercontent.com/82128525/154899930-6333a730-9e2c-4123-a3b7-760d9e61b43f.png"
  );

  const [previewImg, setPreviewImg] = React.useState(
    "https://user-images.githubusercontent.com/82128525/154899930-6333a730-9e2c-4123-a3b7-760d9e61b43f.png"
  );

  const saveFileImage = (e) => {
    const img = e.target.files[0];
    setFileImage(img);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  //날짜 인풋박스 시작일 선택 제한 (오늘 이전의 날짜 선택 불가하게, 너무 오래된 날짜 선택 불가능하게)
  // 오늘 날짜 YYYY-MM-DD형식으로 추출
  const offset = new Date().getTimezoneOffset() * 60000;
  let todayDate = new Date(Date.now() - offset).toISOString().split("T")[0];

  // 오늘 날짜+999일 YYYY-MM-DD형식으로 추출
  const startDate = React.useRef(null);
  console.log(startDate);
  const now = new Date();
  let todayPlus30 = new Date(now.setDate(now.getDate() + 30));
  todayPlus30 = todayPlus30.toISOString().split("T")[0];
  return (
    <Grid>
      {/* 타이틀 */}
      <Grid textAlign="center">
        <Text>챌린지 개설</Text>
      </Grid>
      {/* 제목 */}
      <Grid borderBottom="1px solid">
        <Text>챌린지 제목</Text>
      </Grid>
      {/* 카테고리 선택 */}
      <Grid>
        <Button _onClick={openModal}>카테고리 선택</Button>
        <CategoryModal
          open={modalopen}
          close={closeModal}
          getData={getData}
        ></CategoryModal>
      </Grid>
      {/* 이미지 첨부 */}
      <Grid>
        <Grid is_flex justifyContent="center">
          <ImageInput
            id="input_img"
            type="file"
            accept=".png , .jpg , .png, .jpeg"
            onChange={saveFileImage}
            cursor="pointer"
          ></ImageInput>
        </Grid>
        <Grid>
          <img width="100%" height="100%" src={previewImg} alt="" />
        </Grid>
      </Grid>
      <Grid is_flex justifyContent="center">
        <StartDate
          type="date"
          name="theday"
          min={todayDate}
          ref={startDate}
        ></StartDate>
        <Text>{todayPlus30}</Text>
      </Grid>
    </Grid>
  );
};

const ImageInput = styled.input`
  // display: none;
  accpet: .png, .jpg, .jpeg;
`;

const StartDate = styled.input`
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #000;
  color: white;
  padding: 16px 10px;
  text-align: center;
  margin-right: 3px;
  border: none;
`;

export default PostWrite;
