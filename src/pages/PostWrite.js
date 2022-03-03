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
    console.log(categoryValue);
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

  //선택한 날짜 가져오기
  const [date, setDate] = useState("1993-07-04");
  const onChange = (e) => {
    console.log(e.target); //이벤트가 발생한 타겟의 요소를 출력
    console.log(e.target.value); //이벤트가 발생한 타겟의 Value를 출력
    setDate(e.target.value); //이벤트 발생한 value값으로 {text} 변경
  };

  const onReset = () => {
    setDate(""); // onClick함수 발생시 ''으로 {text} 변경
  };
  // 오늘 날짜+30일 YYYY-MM-DD형식으로 추출

  console.log(date);
  const now = new Date(date);
  let todayPlus30 = new Date(now.setDate(now.getDate() + 30));
  todayPlus30 = todayPlus30.toISOString().split("T")[0];

  //content내용 받아오기
  const desc = React.useRef(null);
  const method = React.useRef(null);

  const complete = () => {
    console.log(desc.current.value);
    console.log(method.current.value);
  };
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
        <Button _onClick={openModal}>
          {categoryValue ? categoryValue : "카테고리 선택"}
        </Button>
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
          onChange={onChange}
        ></StartDate>
      </Grid>
      <Grid padding="0 5%">
        <Text>예상 종료일 : {todayPlus30}</Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 설명</Text>
        <Contents placeholder="내용을 입력해주세요" ref={desc}></Contents>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증 방법</Text>
        <Contents placeholder="내용을 입력해주세요" ref={method}></Contents>
      </Grid>
      <Grid padding="5%">
        <Button _onClick={complete}>개설 완료</Button>
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
  background-color: #9dcabf;
  color: white;
  padding: 16px 10px;
  text-align: center;
  margin-right: 3px;
  border: none;
`;

const Contents = styled.textarea`
  box-sizing: border-box;
  border-radius: 10px;
  border: 2px solid #9dcabf;
  width: 100%;
  padding: 15px;
  height: 30vh;
  resize: none;
`;

export default PostWrite;
