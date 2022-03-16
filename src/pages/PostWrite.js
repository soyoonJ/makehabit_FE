import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as userAction } from "../redux/modules/user";
// import { actionCreators as challengeActions } from "../redux/modules/challenge";

import { Grid, Text } from "../elements";
// import CategoryModal from "../components/CategoryModal";
import CategoryModal1 from "../components/CategoryModal1";
import Upload from "../components/Upload";
import PageBack from "../components/PageBack";
// import { history } from "../redux/configureStore";
import styled from "styled-components";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { GoCalendar } from "react-icons/go";

import moment from "moment";

import ButtonNavigation from "../components/ButtonNavigation";

const PostWrite = () => {
  const dispatch = useDispatch();
  //카테고리 값 가져오기 (자식(CategoryModal) -> 부모(postWrite))
  const [categoryValue, setCategoryValue] = useState(0);
  const [sendCategory, setSendCategory] = useState(null);
  //모달 리스트
  const modalList = [
    ["study", "공부"],
    ["exercise", "운동"],
    ["self-development", "자기계발"],
    ["living-habit", "생활습관"],
  ];
  const getData = (idx) => {
    setCategoryValue(modalList[idx][1]);
    setSendCategory(modalList[idx][0]);
    // console.log(idx, modalList[idx][0], modalList[idx][1]);
  };

  //카테고리 팝업
  // let [modalopen, setModalopen] = React.useState(false);
  //카테고리 팝업 열기
  // const openModal = () => {
  //   setModalopen(true);
  // };

  // //카테고리 팝업 닫기
  // const closeModal = () => {
  //   setModalopen(false);
  // };

  //날짜 인풋박스 시작일 선택 제한 (오늘 이전의 날짜 선택 불가하게, 너무 오래된 날짜 선택 불가능하게)
  // 오늘 날짜 YYYY-MM-DD형식으로 추출
  const offset = new Date().getTimezoneOffset() * 60000;
  let todayDate = new Date(Date.now() - offset).toISOString().split("T")[0];

  //선택한 날짜 가져오기
  const [date, setDate] = useState(null);
  const onChange = (e) => {
    // console.log(e.target); //이벤트가 발생한 타겟의 요소를 출력
    // console.log(e.target.value); //이벤트가 발생한 타겟의 Value를 출력
    setDate(e.target.value); //이벤트 발생한 value값으로 {text} 변경
  };

  // const onReset = () => {
  //   setDate(null); // onClick함수 발생시 ''으로 {text} 변경
  // };
  // 오늘 날짜+30일 YYYY-MM-DD형식으로 추출

  // console.log(date);
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

  //업로드에 함수 접근하는 Ref
  const uploadRef = React.useRef();

  const fileInput = React.useRef();
  //userId 가져오기
  // const loginCheck = useSelector((state) => state.user.user);
  let image;
  const confirm = () => {
    const imageForm = new FormData();
    image = fileInput.current.files[0];
    imageForm.append("image", image);
    console.log("들어왔나?", date, desc, method);

    if (image === undefined) {
      alert("썸네일 이미지가 없습니다!");
      return;
    }

    if (title === null) {
      alert("챌린지 제목이 없습니다!");
      return;
    }

    if (sendCategory === null) {
      alert("카테고리를 설정하지 않았습니다!");
      return;
    }

    if (date === null) {
      alert("시작일이 입력되지 않았습니다.");
      return;
    }
    if (desc === "") {
      alert("챌린지 설명을 쓰지 않았습니다.");
      return;
    }
    if (method === "") {
      alert("챌린지 인증 방법을 쓰지 않았습니다");
      return;
    }
    dispatch(
      postActions.addPostDB(
        title,
        sendCategory,
        imageForm,
        date,
        desc,
        method,
        "tags"
      )
    );
  };

  // const imageForm = new FormData();

  // React.useEffect(() => {
  //   image = fileInput.current.files[0];
  //   imageForm.append("image", image);
  // }, [fileInput]);

  //자식 함수 접근하는 Ref
  const childRef = useRef();

  //moment 변환
  const startDay = moment(date);
  const transformDay = startDay.format("YYYY년 MM월 DD일");

  return (
    <Container>
      <PageBack />
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

          <CategoryModal1 ref={childRef} getData={getData}></CategoryModal1>
        </Grid>
        {/* 이미지 첨부 */}

        <Grid is_flex justifyContent="center">
          <Grid>
            <Text>챌린지 시작일</Text>
          </Grid>
          <Grid is_flex>
            {/* <GoCalendar
                onClick={() => {
                  calendar();
                }}
                style={{ cursor: "pointer" }}
              /> */}
            <Text color="#FF8B37">
              {date ? transformDay : "2022년 00월 00일"}
            </Text>
            <StartDate
              id="inputCalendar"
              type="date"
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
            maxLength="500"
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
            maxLength="500"
          ></Contents>
          <Text textAlign="right">
            {method.length ? method.length : "0"}/500자
          </Text>
        </Grid>
        <Grid padding="5%" margin="0 0 150px 0">
          {console.log(
            "데이터",
            image,
            title,
            sendCategory,
            date,
            desc,
            method
          )}
          {image && title && sendCategory && date && desc && method ? (
            <Link
              to={{
                pathname: "/completed/open",
                state: { openStart: date },
              }}
            >
              <CreateButton
                onClick={() => {
                  console.log("아무거나");
                  confirm();
                }}
              >
                개설 완료
              </CreateButton>
            </Link>
          ) : (
            <CreateButton
              onClick={() => {
                confirm();
              }}
            >
              개설 완료
            </CreateButton>
          )}
        </Grid>
      </Grid>

      <ButtonNavigation />
    </Container>
  );
};
const Container = styled.div``;
const StartDate = styled.input`
  // box-sizing: border-box;
  // border-radius: 10px;
  // background-color: #9dcabf;
  color: white;
  // padding: 16px 10px;
  text-align: center;
  // margin-right: 3px;
  border: none;
  ::-webkit-datetime-edit {
    display: none;
  }
  ::-webkit-calendar-picker-indicator {
    font-size: 30px;
    margin: auto;
  }
  cursor: pointer;
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
