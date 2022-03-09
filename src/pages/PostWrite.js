import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userAction } from "../redux/modules/user";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

import CategoryModal from "../components/CategoryModal";
import CategoryModal1 from "../components/CategoryModal1";
import Upload from "../components/Upload";

import { history } from "../redux/configureStore";
import styled from "styled-components";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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
  const [desc, setDesc] = React.useState("");
  const [method, setMethod] = React.useState("");

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
    dispatch(challengeActions.setComplete("confirm"));
  };
  //자식 함수 접근하는 Ref
  const childRef = useRef();

  return (
    <Container>
      <Grid>
        {/* 타이틀 */}
        <Grid textAlign="center" borderBottom="solid 1px #e0e0e0">
          <Text>챌린지 개설</Text>
        </Grid>

        {/* 이미지 업로드 */}
        <Grid>
          <Upload
            ref={uploadRef}
            _ref={fileInput}
            _onClick={() => {
              uploadRef.current.upload();
            }}
          />
        </Grid>

        {/* 제목 */}
        <Grid padding="10px">
          <Text>챌린지 제목</Text>
          <TitleInput
            placeholder="제목을 입력해주세요."
            onChange={onChangeTitle}
          />
        </Grid>
        {/* 카테고리 선택 */}
        <Grid>
          <CategoryButton
            onClick={() => {
              childRef.current.openModal();
            }}
          >
            {categoryValue ? (
              categoryValue
            ) : (
              <Grid is_flex justifyContent="center">
                <Grid>
                  <Text style={{ padding: "100px" }}>카테고리 선택</Text>
                </Grid>
                <Grid style={{ textAlign: "right" }}>
                  <MdOutlineKeyboardArrowDown />
                </Grid>
              </Grid>
            )}
          </CategoryButton>

          <CategoryModal1 ref={childRef}></CategoryModal1>
        </Grid>
        {/* 이미지 첨부 */}

        <Grid is_flex justifyContent="center">
          <Grid>
            <Text>챌린지 시작일</Text>
          </Grid>
          <Grid>
            <StartDate
              type="date"
              name="theday"
              min={todayDate}
              onChange={onChange}
            ></StartDate>
          </Grid>
        </Grid>
        <Grid padding="0 5%">
          <Text>3일간 10번씩 도전해봐요!</Text>
        </Grid>
        {/* 예상 종료일 */}
        <ColorBox>
          <Text color="white">
            예상 종료일 :{" "}
            {todayPlus30 > todayDate
              ? todayPlus30
              : "예상 종료일은 30일 뒤 입니다."}
          </Text>
        </ColorBox>
        <Grid padding="5%">
          <Grid>
            <Text>챌린지 설명 작성</Text>
          </Grid>
          <Grid>
            <Text>무얼 도전해볼까요? 챌린지에 대해 설명해주세요.</Text>
          </Grid>
          <Contents
            placeholder="ex) 매일 책 한 권 읽는 챌린지"
            onChange={onChangeDesc}
          ></Contents>
          <Text textAlign="right">{desc.length ? desc.length : "0"}/500자</Text>
        </Grid>
        <Grid padding="5%">
          <Grid>
            <Text>챌린지 인증 방법</Text>
          </Grid>
          <Grid>
            <Text>달성을 인증할 수 있는 방법에 대해 설명해주세요.</Text>
          </Grid>
          <Contents
            placeholder="ex) 오늘 날짜가 적힌 메모와 책 페이지를 찍어주세요."
            onChange={onChangeMethod}
          ></Contents>
          <Text textAlign="right">
            {method.length ? method.length : "0"}/500자
          </Text>
        </Grid>
        <Grid padding="5%">
          <CreateButton
            _onClick={() => {
              confirm();
            }}
          >
            개설 완료
          </CreateButton>
        </Grid>
      </Grid>
    </Container>
  );
};
const Container = styled.div``;
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
  width: 100%;
  padding: 15px;
  height: 30vh;
  background: #f7f7f7;
  resize: none;
`;

const CategoryButton = styled.button`
  width: 100%;
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
`;

const ColorBox = styled.div`
  width: 100%;
  height: 40px;
  background-color: #ff8b37;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const TitleInput = styled.input`
  width: 100%;
  background-color: #f7f7f7;
  height: 60px;
  border: none;
  border-radius: 5px;
`;

const CreateButton = styled.button`
  width: 100%;
  height: 60px;
  cursor: pointer;
  background-color: #ff8b37;
  border: none;
  border-radius: 5px;
  color: #fff;
`;
export default PostWrite;
