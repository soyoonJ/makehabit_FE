// textarea 우측 마진 안 맞는 부분 수정

import React from "react";

import { ContainerGrid } from "../elements";
import PageBack from "../components/PageBack";
import Upload from "../components/Upload";
import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import Modal from "../components/Modal";
// import ButtonNavigation from "../components/ButtonNavigation";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

const Confirm = (props) => {
  const challengeId = props.match.params.id;
  console.log("파라미터값", challengeId);
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
    "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-file-upload-icon-image_1344393.jpg"
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
  const onChange = (e) => {
    setComment(e.target.value);
    setLength(e.target.value.length);
  };

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
      <ContainerGrid>
        <ConfirmText>
          <PageBack color="#707070" left padding="0 0 0 1.063rem" />
          <span>오늘의 인증하기</span>
        </ConfirmText>
        {/* useSelector 해서 타이틀 가져오기 */}
        <Title>{challenge_info?.title}</Title>
        <SubTitle>오늘의 도전에 성공한 순간을 사진으로 기록해보세요.</SubTitle>
        {/* <ImageBox
          onClick={onClickUpload}
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          <input
            accept=".png , .jpg , .png, .jpeg"
            type="file"
            onChange={handlePreview}
            ref={fileInput}
            id="thumnail"
          ></input>
        </ImageBox> */}
        {/* 이미지 첨부 */}
        <Upload
          ref={uploadRef}
          _ref={fileInput}
          _onClick={() => {
            console.log(uploadRef);
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
            [아이콘]
          </span>
        </Example>
        <CommentTitle>코멘트 남기기</CommentTitle>
        <div>오늘의 도전과 함께 기록해보세요.</div>
        <Textarea
          onChange={onChange}
          maxLength="300"
          placeholder="인증과 함께 소감을 남겨보세요."
        ></Textarea>
        <div
          style={{
            textAlign: "end",
            marginBottom: "12.5vh",
            marginTop: "0.438em",
            color: "#9C9C9C",
            lineHeight: "1.313em",
          }}
        >
          {commentLength}/300자
        </div>

        <Button onClick={confirm}>인증 완료하기</Button>
      </ContainerGrid>

      <Modal ref={modalRef}>
        <div>챌린지 인증예시</div>
        <div
          style={{
            margin: "0.563rem 0 2rem 0",
            fontWeight: "600",
            lineHeight: "1.5rem",
            fontSize: "1.125rem",
            color: "#FF8B37",
            letterSpacing: "-0.005rem",
          }}
        >
          <span>[체크]</span> 이렇게 인증해주세요!
        </div>
        <div
          style={{
            lineHeight: "1.875em",
            fontSize: "1.25rem",
            color: "#1D1B1B",
            letterSpacing: "-0.005rem",
          }}
        >
          {challenge_info?.howtoContent}
        </div>
      </Modal>
    </React.Fragment>
  );
};

// 인증하기 텍스트
const ConfirmText = styled.div`
  text-align: center;
  margin: 1.313em 0 4.7vh 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 1.375rem;
    font-weight: bold;
    line-height: 1.813rem;
  }
`;

// 타이틀
const Title = styled.div`
  font-weight: 700;
  font-size: 1.375rem;
  color: #ff8b37;
  line-height: 1.813rem;
  letter-spacing: -0.005em;
`;
const SubTitle = styled.div`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.313rem;
  color: #1d1b1b;
  margin: 0.5rem 0 1.5rem 0;
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
  text-align: right;
  color: #707070;
  font-weight: 400;
  font-size: 0.813rem;
  line-height: 1.063rem;
  margin-top: 0.75rem;
`;

// 코멘트 작성란
const CommentTitle = styled.div`
  margin: 1.25rem 0 0.375rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.625rem;
  color: #1d1b1b;

  & > div {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.313rem;
    color: #1d1b1b;
  }
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 8.125rem;
  resize: none;
  box-sizing: border-box;
  margin-top: 1rem;
  background: #f7f7f7;
  border: none;
  font-size: 1rem;
  padding: 1.25rem 1.625rem;

  ::placeholder {
    color: #9c9c9c;
  }
`;
const Button = styled.button`
  width: 100%;
  height: 4.125rem;
  border: none;
  border-radius: 5px;
  background: #ff8b37;
  color: white;
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.813rem;
  margin: 0 0 5% 0;
`;

export default Confirm;
