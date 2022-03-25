// textarea 우측 마진 안 맞는 부분 수정

import React from "react";

import { ContainerGrid } from "../elements";
import PageBack from "../components/PageBack";
import Upload from "../components/Upload";
import Modal from "../components/Modal";
import MetaTag from "../shared/MetaTag";

import { ReactComponent as CheckImg } from "../img/icon_check.svg";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { debounce, throttle } from "lodash";
// import ButtonNavigation from "../components/ButtonNavigation";
import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { Style } from "@material-ui/icons";

const Confirm = (props) => {
  const challengeId = props.match.params.id;
  // console.log("파라미터값", challengeId);
  // const Item = process.env.PUBLIC_URL + "/images/open_base";
  // 챌린지 조회 정보
  const challenge_info = useSelector((state) => state.challenge.challenge_info);
  // console.log("챌린지정보", challenge_info);
  //modal에 접근하는 ref
  const modalRef = React.useRef();

  //업로드에 함수 접근하는 Ref
  const uploadRef = React.useRef();

  const fileInput = React.useRef();
  const dispatch = useDispatch();
  // const preview = useSelector((state) => state.image.preview);
  const [preview, setPreview] = React.useState(
    process.env.PUBLIC_URL + "/images/open_base"
  );

  // 이미지 미리보기 세팅하기 위함
  const handlePreview = (e) => {
    const file = e.target.files[0];
    const newUrl = URL.createObjectURL(file);
    setPreview(newUrl);
  };
  // 파일업로드버튼+이미지 합치기 위한 작업
  // 기본이미지 클릭 시 파일업로드 버튼 클릭되도록!!
  const onClickUpload = () => {
    let myInput = document.getElementById("thumnail");
    myInput.click();
  };

  // 코멘트 값 받아오기
  const [comment, setComment] = React.useState(null);
  const [commentLength, setLength] = React.useState(0);

  const debounceComment = debounce((e) => {
    setComment(e.target.value);
  }, 500);
  const throttleLength = throttle((e) => {
    setLength(e.target.value.length);
  }, 300);
  const commentKeyPress = React.useCallback(debounceComment, []);
  const lengthKeyPress = React.useCallback(throttleLength, []);
  const onChange = (e) => {
    commentKeyPress(e);
    lengthKeyPress(e);
  };

  // console.log("comment", comment);
  // console.log("commentLength", commentLength);

  const confirm = () => {
    if (fileInput.current.files[0] === undefined || comment === null) {
      window.alert("이미지와 코멘트 작성란을 모두 채워주세요");
      return;
    } else {
      const imageForm = new FormData();
      let image = fileInput.current.files[0];
      // let image2 = uploadRef.current.files[0];
      imageForm.append("image", image);

      // for (var key of imageForm.keys()) {
      //   console.log("key", key);
      // }

      // for (var value of imageForm.values()) {
      //   console.log("value", value);
      // }

      dispatch(
        challengeActions.confirmDB(challengeId, imageForm, "타이틀", comment)
      );
    }
  };

  React.useEffect(() => {
    dispatch(challengeActions.getConfirmDB(challengeId));
  }, []);

  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 오늘의 인증" />

      <Container>
        <ContainerGrid>
          <ConfirmText>
            <PageBack color="#707070" left padding="0 0 0 1.063rem" />
            <span>오늘의 인증하기</span>
          </ConfirmText>
          {/* useSelector 해서 타이틀 가져오기 */}
          <Title>{challenge_info?.title}</Title>
          <SubTitle>
            오늘의 도전에 성공한 순간을 사진으로 기록해보세요.
          </SubTitle>

          {/* 이미지 첨부 */}
          <Upload
            currentPage="confirm"
            ref={uploadRef}
            _ref={fileInput}
            _onClick={() => {
              // console.log(uploadRef);
              uploadRef.current.upload();
            }}
          />
          <Example>
            자세한 인증 예시가 궁금하다면?
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                modalRef.current.openModal();
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/modal_question.png"}
                alt="물음표 아이콘"
                style={{
                  width: "1.125rem",
                  height: "1.125rem",
                  display: "flex",
                  marginLeft: "0.438rem",
                }}
              />
            </span>
          </Example>
          <CommentTitle>코멘트 남기기</CommentTitle>
          <div style={{ fontSize: "1.89vh" }}>
            오늘의 도전과 함께 기록해보세요.
          </div>
          <Textarea
            onChange={onChange}
            maxLength="300"
            placeholder="인증과 함께 소감을 남겨보세요."
          ></Textarea>
          <div
            style={{
              textAlign: "end",
              marginTop: "0.94vh",
              color: "#9C9C9C",
              lineHeight: "2.65vh",
              fontSize: "1.89vh",
            }}
          >
            {commentLength}/300자
          </div>

          <Button onClick={confirm}>인증 완료하기</Button>
        </ContainerGrid>

        <Modal ref={modalRef}>
          <div>도전 인증 예시</div>
          <div
            style={{
              margin: "1.65vh 0 3.79vh 0",
              fontWeight: "600",
              lineHeight: "2.79vh",
              fontSize: "2.13vh",
              color: "#FF8B37",
              letterSpacing: "-0.005rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginRight: "0.313rem",
                display: "flex",
              }}
            >
              <CheckImg fill="#FF8B37" width="1.5rem" height="1.5rem" />
            </span>{" "}
            이렇게 인증해주세요!
          </div>
          <div
            style={{
              lineHeight: "3.31vh",
              fontSize: "2.37vh",
              color: "#1D1B1B",
              wordBreak: "break-word",
              letterSpacing: "-0.005rem",
            }}
          >
            {challenge_info?.howtoContent}
          </div>
        </Modal>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  max-height: 100vh;
`;

// 인증하기 텍스트
const ConfirmText = styled.div`
  text-align: center;
  padding-top: 2.48vh;
  margin: 0 0 5vh 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 2.6vh;
    font-weight: bold;
    line-height: 1.813rem;
  }
`;

// 타이틀
const Title = styled.div`
  font-weight: 700;
  font-size: 2.6vh;
  color: #ff8b37;
  line-height: 3.41vh;
  letter-spacing: -0.005em;
`;
const SubTitle = styled.div`
  font-weight: 400;
  font-size: 1.9vh;
  line-height: 1.313rem;
  color: #1d1b1b;
  margin: 0.94vh 0 2.7vh 0;
`;

// 이미지
// const ImageBox = styled.div`
//   width: 100%;
//   max-width: 420px;
//   height: 300px;
//   background-size: cover;
//   cursor: pointer;

//   input {
//     display: none;
//     width: 100%;
//     height: 100%;
//   }
// `;

// 챌린지 예시 도움말
const Example = styled.div`
  color: #707070;
  font-weight: 400;
  font-size: 0.813rem;
  line-height: 1.063rem;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: end;
`;

// 코멘트 작성란
const CommentTitle = styled.div`
  margin: 4.73vh 0 0.71vh;
  font-size: 2.36vh;
  font-weight: 700;
  line-height: 3.1vh;
  color: #1d1b1b;

  & > div {
    font-size: 1.89vh;
    font-weight: 400;
    line-height: 2.65vh;
    color: #1d1b1b;
  }
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 15.4vh;
  resize: none;
  box-sizing: border-box;
  margin-top: 1.77vh;
  background: #f7f7f7;
  border: none;
  font-size: 1.89vh;
  padding: 1.25rem 1.625rem;

  ::placeholder {
    color: #9c9c9c;
    font-size: 1.89vh;
  }
`;
const Button = styled.button`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  font-size: 2.6vh;
  font-weight: 700;
  width: 90%;
  max-width: 380px;
  height: 7.93vh;
  border: none;
  border-radius: 5px;
  background: #ff8b37;
  color: white;
  margin: 0 auto 2.36vh auto;
`;

export default Confirm;
