import React from "react";

import { ContainerGrid } from "../elements";
import PageBack from "../components/PageBack";
import Upload from "../components/Upload";
import Modal from "../components/Modal";
import MetaTag from "../shared/MetaTag";
import Spinner from "../shared/Spinner";

import { ReactComponent as CheckImg } from "../img/icon_check.svg";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { debounce, throttle } from "lodash";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

interface uploadProps {
	upload: () => void;
}

const Confirm = (props) => {
  const challengeId = props.match.params.id;
  const challenge_info = useSelector((state:any) => state.challenge.challenge_info);

  const modalRef = React.useRef();
  const uploadRef = React.useRef<uploadProps>();

  const fileInput = React.useRef<HTMLInputElement>();
  const dispatch = useDispatch();

  // 코멘트 값 받아오기
  const [comment, setComment] = React.useState(null);
  const [commentLength, setLength] = React.useState(0);

  const debounceComment = debounce((e) => {
    setComment(e.target.value);
  }, 300);
  const throttleLength = throttle((e) => {
    setLength(e.target.value.length);
  }, 200);
  const commentKeyPress = React.useCallback(debounceComment, []);
  const lengthKeyPress = React.useCallback(throttleLength, []);
  const onChange = (e) => {
    commentKeyPress(e);
    lengthKeyPress(e);
  };

  const isLoading = useSelector((state:any) => state.challenge?.isLoading);
  const isUploaded = useSelector((state:any) => state.challenge?.isUpload);

  const confirm = () => {
    if (fileInput.current.files[0] === undefined || comment === null) {
      window.alert("이미지와 코멘트 작성란을 모두 채워주세요");
      return;
    } else {
      const imageForm = new FormData();
      let image = fileInput.current.files[0];
      imageForm.append("image", image);

      // imageForm 데이터 잘 들어가는지 확인하기 위함
      // for (var key of imageForm.keys()) {
      //   console.log("key", key);
      // }

      // for (var value of imageForm.values()) {
      //   console.log("value", value);
      // }

      dispatch(
        challengeActions.confirmDB(
          challengeId,
          imageForm,
          challenge_info?.title,
          comment
        )
      );
    }
  };

  React.useEffect(() => {
    dispatch(challengeActions.getConfirmDB(challengeId));
  }, []);

  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 오늘의 인증" />
      {isLoading === true && isUploaded === false ? <Spinner /> : ""}

      <Container>
        <ContainerGrid>
          <ConfirmText>
            <PageBack color="#707070" left padding="0 0 0 1.063rem" />
            <span>오늘의 인증하기</span>
          </ConfirmText>
          <Title>{challenge_info?.title}</Title>
          <SubTitle>
            오늘의 도전에 성공한 순간을 사진으로 기록해보세요.
          </SubTitle>

          <Upload
            currentPage="confirm"
            ref={uploadRef}
            _ref={fileInput}
            _onClick={() => {
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
          <div style={{ fontSize: "1rem" }}>
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
              marginBottom: "9vh",
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

const Title = styled.div`
  font-weight: 700;
  font-size: 2.6vh;
  word-break: break-all;
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

const CommentTitle = styled.div`
  margin: 4.73vh 0 0.375rem;
  font-size: 1.25rem;
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
  height: 8.125rem;
  resize: none;
  box-sizing: border-box;
  margin-top: 1.77vh;
  background: #f7f7f7;
  border: none;
  font-size: 1rem;
  padding: 1.25rem 1.625rem;

  ::placeholder {
    color: #9c9c9c;
    font-size: 1rem;
  }
`;
const Button = styled.button`
  font-size: 2.6vh;
  font-weight: 700;
  width: 100%;
  max-width: 380px;
  height: 7.93vh;
  border: none;
  border-radius: 5px;
  background: #ff8b37;
  color: white;
  margin: 0 auto 2.36vh auto;
`;

export default Confirm;
