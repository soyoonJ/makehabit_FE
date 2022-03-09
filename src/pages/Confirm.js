// textarea 우측 마진 안 맞는 부분 수정

import React from "react";

import { ContainerGrid, Grid, Text, Input, Image } from "../elements";
import GoBack from "../components/GoBack";
import Upload from "../components/Upload";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import Modal from "../components/Modal";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

const Confirm = (props) => {
  const challengeId = props.match.params.id;
  // console.log(challengeId);
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
    const imageForm = new FormData();
    let image = fileInput.current.files[0];
    // let image2 = uploadRef.current.files[0];
    imageForm.append("image", image);

    for (var key of imageForm.keys()) {
      console.log("key", key);
    }

    for (var value of imageForm.values()) {
      console.log("value", value);
    }

    dispatch(
      challengeActions.confirmDB(challengeId, imageForm, "타이틀", comment)
    );
    dispatch(challengeActions.setComplete("confirm"));
  };

  React.useEffect(() => {
    dispatch(challengeActions.getConfirmDB(challengeId));
  }, []);

  return (
    <React.Fragment>
      <ContainerGrid>
        <ConfirmText>
          <GoBack color="black" />
          <span>인증하기</span>
        </ConfirmText>
        {/* useSelector 해서 타이틀 가져오기 */}
        <Title>{challenge_info?.challengeTitle}</Title>
        <SubTitle>
          오늘의 도전을 성공하신 oo님! 인증사진을 올리고 포인트?
        </SubTitle>
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
          챌린지 인증 예시가 궁금하다면?
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
        <CommentTitle>코멘트</CommentTitle>
        <div>예쁘게 어쩌구~~예쁘게 어쩌구~~</div>
        <Textarea rows="8" onChange={onChange} maxLength="300"></Textarea>
        <div style={{ marginBottom: "100px", textAlign: "end" }}>
          {commentLength}/300자
        </div>
      </ContainerGrid>

      <Grid>
        <Button onClick={confirm}>인증완료하기</Button>
      </Grid>

      <Modal ref={modalRef}>
        <Grid padding="30px 30px 0px 30px">
          <div>챌린지 인증예시</div>
          <div>{challenge_info?.howtoContent}</div>
        </Grid>
      </Modal>
    </React.Fragment>
  );
};

// 인증하기 텍스트
const ConfirmText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
`;

// 타이틀
const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
`;
const SubTitle = styled.div`
  margin-bottom: 10px;
`;

// 이미지
const ImageBox = styled.div`
  width: 100%;
  max-width: 420px;
  height: 300px;
  background-size: cover;
  cursor: pointer;

  input {
    display: none;
    width: 100%;
    height: 100%;
  }
`;

// 챌린지 예시 도움말
const Example = styled.div`
  text-align: right;
`;

// 코멘트 작성란
const CommentTitle = styled.div`
  margin-top: 20px;
`;
const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  box-sizing: border-box;
`;
const Button = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 420px;
  height: 80px;
  border: none;
  color: white;
  background: orange;
`;

export default Confirm;
