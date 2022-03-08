import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userAction } from "../redux/modules/user";

import CategoryModal from "../components/CategoryModal";
import Upload from "../components/Upload";

import styled from "styled-components";

const PostWrite = () => {
  const dispatch = useDispatch();
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

  //날짜 인풋박스 시작일 선택 제한 (오늘 이전의 날짜 선택 불가하게, 너무 오래된 날짜 선택 불가능하게)
  // 오늘 날짜 YYYY-MM-DD형식으로 추출
  const offset = new Date().getTimezoneOffset() * 60000;
  let todayDate = new Date(Date.now() - offset).toISOString().split("T")[0];

  //선택한 날짜 가져오기
  const [date, setDate] = useState(null);
  const onChange = (e) => {
    console.log(e.target); //이벤트가 발생한 타겟의 요소를 출력
    console.log(e.target.value); //이벤트가 발생한 타겟의 Value를 출력
    setDate(e.target.value); //이벤트 발생한 value값으로 {text} 변경
  };

  const onReset = () => {
    setDate(null); // onClick함수 발생시 ''으로 {text} 변경
  };
  // 오늘 날짜+30일 YYYY-MM-DD형식으로 추출

  console.log(date);
  const now = new Date(date);
  let todayPlus30 = new Date(now.setDate(now.getDate() + 30));
  todayPlus30 = todayPlus30.toISOString().split("T")[0];

  //content내용 받아오기
  const [title, setTitle] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [method, setMethod] = React.useState(null);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDesc = (e) => {
    setDesc(e.target.value);
  };
  const onChangeMethod = (e) => {
    setMethod(e.target.value);
  };

  const complete = () => {
    console.log(desc.current.value);
    console.log(method.current.value);
  };

  //업로드에 함수 접근하는 Ref
  const uploadRef = React.useRef();

  const fileInput = React.useRef();
  //userId 가져오기
  const loginCheck = useSelector((state) => state.user.user);

  const confirm = () => {
    // challengeId, imgUrl, challengeTitle, comment;
    // 타이틀 props로 가져온거 넣어주기
    const imageForm = new FormData();
    // console.log("newFormData 확인", imageForm);
    // console.log("fileInput ref확인", fileInput);
    // console.log("uploadRef ref확인", uploadRef);
    let image = fileInput.current.files[0];
    // console.log("image", image);
    // let image2 = uploadRef.current.files[0];
    imageForm.append("image", image);
    // console.log("최종imageForm확인", imageForm);

    for (var key of imageForm.keys()) {
      console.log("key", key);
    }

    for (var value of imageForm.values()) {
      console.log("value", value);
    }
    console.log(
      "datinwirte",
      title,
      categoryValue,
      imageForm,
      date,
      desc,
      method,
      "tags"
    );
    dispatch(
      postActions.addPostDB(
        title,
        categoryValue,
        imageForm,
        date,
        desc,
        method,
        "tags"
      )
    );
  };
  return (
    <Grid>
      {/* 타이틀 */}
      <Grid textAlign="center">
        <Text>챌린지 개설</Text>
      </Grid>
      {/* 제목 */}
      <Grid borderBottom="1px solid">
        <Input placeholder="챌린지 제목" _onChange={onChangeTitle} />
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
      <Upload
        ref={uploadRef}
        _ref={fileInput}
        _onClick={() => {
          uploadRef.current.upload();
        }}
      />
      <Grid is_flex justifyContent="center">
        <StartDate
          type="date"
          name="theday"
          min={todayDate}
          onChange={onChange}
        ></StartDate>
      </Grid>
      <Grid padding="0 5%">
        <Text>
          예상 종료일 :{" "}
          {todayPlus30 > todayDate
            ? todayPlus30
            : "예상 종료일은 30일 뒤 입니다."}
        </Text>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 설명</Text>
        <Contents
          placeholder="내용을 입력해주세요"
          onChange={onChangeDesc}
        ></Contents>
      </Grid>
      <Grid padding="5%">
        <Text>챌린지 인증 방법</Text>
        <Contents
          placeholder="내용을 입력해주세요"
          onChange={onChangeMethod}
        ></Contents>
      </Grid>
      <Grid padding="5%">
        <Button
          _onClick={() => {
            confirm();
          }}
        >
          개설 완료
        </Button>
      </Grid>
    </Grid>
  );
};

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

const ImageBox = styled.div`
  display: flex;

  margin: auto;
  max-width: 420px;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-size: 100% 100%;
`;

const ImageInput = styled.input`
  display: none;
  // ::file-selector-button {
  //   display: none;
  // }
  width: 100%;
  height: 100%;
`;
export default PostWrite;
