import React from "react";

import { useLocation } from "react-router-dom";
// import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { ContainerGrid } from "../elements";
import PageBack from "../components/PageBack";
import MetaTag from "../shared/MetaTag";
import Spinner from "../shared/Spinner";

import styled from "styled-components";

const MyFeed = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const length = location.state.length;
  const order = location.state.order;

  const proofShotId = props.match.params.id;
  const feed = useSelector((state) => state.challenge?.feed);
  // console.log("피드", feed);
  const isLoading = useSelector((state) => state.challenge.isLoading);

  React.useEffect(() => {
    dispatch(challengeActions.myfeedDB(proofShotId));
  }, []);

  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 나의 기록보기" />
      {isLoading ? <Spinner /> : ""}

      <PageBack padding="2.13vh 4.36%" color="#707070" />
      <FeedNum>
        {order + 1}/{length}
      </FeedNum>
      <ImageContainer>
        <Img src={feed?.imgUrl} alt="인증이미지" />
      </ImageContainer>
      <ContainerGrid>
        {feed && (
          <Comment>
            <div>{feed.challengeTitle}</div>
            <div>
              {feed.createdAt.slice(0, 4)}. {feed.createdAt.slice(5, 7)}.{" "}
              {feed.createdAt.slice(8, 10)}
            </div>
            <div>{feed.comment}</div>
          </Comment>
        )}
      </ContainerGrid>
    </React.Fragment>
  );
};

const FeedNum = styled.div`
  padding: 2.49vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.6vh;
  line-height: 3.41vh;
  letter-spacing: -0.005rem;
  font-weight: 700;
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
    &:nth-child(1) {
      font-size: 2.6vh;
      font-weight: 700;
      line-height: 3.41vh;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
      margin-bottom: 1.3vh;
    }
    &:nth-child(2) {
      font-size: 1.54vh;
      line-height: 1.063rem;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
      margin-bottom: 2.125rem;
    }
    &:nth-child(3) {
      font-size: 2.37vh;
      line-height: 1.625rem;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
    }
  }
`;

export default MyFeed;
