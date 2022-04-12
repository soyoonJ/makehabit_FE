import React from "react";

import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { ContainerGrid, Text } from "../elements";
import MetaTag from "../shared/MetaTag";

import styled from "styled-components";
import { ReactComponent as GoBack } from "../img/icon_left.svg";
import { history } from "../redux/configureStore";

import { debounce, throttle } from "lodash";

const MyFeed = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const length = location.state.length;
  const order = location.state.order;

  const proofShotId = props.match.params.id;
  const feed = useSelector((state) => state.challenge?.feed);

  const [comment, setComment] = React.useState(null);
  const [commentLength, setLength] = React.useState(null);

  const debounceComment = debounce((e) => {
    setComment(e.target.value);
  }, 100);
  const commentKeyPress = React.useCallback(debounceComment, []);

  const throttleLength = throttle((e) => {
    setLength(e.target.value.length);
  }, 100);
  const lengthKeyPress = React.useCallback(throttleLength, []);

  const onChange = (e) => {
    commentKeyPress(e);
    lengthKeyPress(e);
  };

  const [change, setChange] = React.useState(false);

  const wantChange = () => {
    setChange(true);
    if (feed?.comment === null) {
      setLength(0);
    } else {
      setLength(feed?.comment.length);
    }
  };
  const submitChange = () => {
    if (commentLength === 0) {
      alert("1글자 이상 입력해주세요");
    } else {
      dispatch(challengeActions.changeCommentDB(proofShotId, comment));
      setChange(false);
    }
  };

  React.useEffect(() => {
    dispatch(challengeActions.myfeedDB(proofShotId));
    setComment(feed?.comment);
  }, []);

  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 나의 기록보기" />

      <ContainerGrid>
        <Header>
          <GoBack
            style={{
              margin: "auto",
              fill: "#707070",
            }}
            onClick={() => {
              history.goBack();
            }}
          />
          <Text alignCenter size="22px" bold>
            {order + 1}/{length}
          </Text>
        </Header>
      </ContainerGrid>

      <ImageContainer>
        <Img src={feed?.imgUrl} alt="인증이미지" />
      </ImageContainer>

      <ContainerGrid>
        {feed && (
          <Comment>
            <Title>
              <div>{feed.challengeTitle}</div>
              {!change ? (
                <div onClick={wantChange} className="Rewrite">
                  수정하기
                </div>
              ) : (
                <div onClick={submitChange} className="Complete">
                  저장하기
                </div>
              )}
            </Title>

            <div>
              {feed.createdAt.slice(0, 4)}. {feed.createdAt.slice(5, 7)}.{" "}
              {feed.createdAt.slice(8, 10)}
            </div>

            {!change ? (
              <div>{feed.comment}</div>
            ) : (
              <>
                <textarea
                  onChange={onChange}
                  maxLength="300"
                  defaultValue={feed.comment}
                  placeholder=""
                />
                <div
                  style={{
                    textAlign: "end",
                    marginBottom: "1.75rem",
                    color: "#9C9C9C",
                    lineHeight: "2.65vh",
                    fontSize: "1.89vh",
                  }}
                >
                  {commentLength}/300자
                </div>
              </>
            )}
          </Comment>
        )}
      </ContainerGrid>
    </React.Fragment>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;
const ImageContainer = styled.div`
  height: 54.5vh;
  margin-bottom: 1.75rem;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Comment = styled.div`
  & > div {
    &:nth-child(2) {
      font-size: 0.813rem;
      line-height: 1.063rem;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
      margin-bottom: 2.125rem;
    }
    &:nth-child(3) {
      font-size: 1.25rem;
      line-height: 1.625rem;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
      margin-bottom: 1.75rem;
      white-space: pre-wrap;
    }
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
    resize: none;
    height: 8.125rem;
    background: #f7f7f7;
    border: none;
    font-size: 1rem;
    padding: 1.25rem 1.625rem;

    ::placeholder {
      color: #9c9c9c;
      font-size: 1rem;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.3vh;

  & > div {
    &:nth-child(1) {
      display: flex;
      justify-content: center;
      align-content: center;
      font-size: 1.375rem;
      font-weight: 700;
      line-height: 1.801rem;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
    }
  }

  .Rewrite {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 1.75rem;
    border-radius: 5px;
    margin-left: 10px;
    padding: 0.188rem 0.5rem;
    font-size: 1.125rem;
    line-height: 1.375rem;
    font-weight: 500;
    background: #f7f7f7;
    color: #707070;
  }

  .Complete {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 1.75rem;
    border-radius: 5px;
    margin-left: 10px;
    padding: 0.188rem 0.5rem;
    font-size: 1.125rem;
    line-height: 1.375rem;
    font-weight: 500;
    background: #ff8b37;
    color: #fff;
  }
`;

export default MyFeed;
