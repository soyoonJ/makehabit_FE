import React from "react";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { ContainerGrid, Grid, Text, Input, Image } from "../elements";
import PageBack from "../components/PageBack";

import styled from "styled-components";

const MyFeed = (props) => {
  const dispatch = useDispatch();
  const proofShotId = props.match.params.id;
  // console.log(proofShotId);
  const feed = useSelector((state) => state.challenge.feed);

  React.useEffect(() => {
    dispatch(challengeActions.myfeedDB(proofShotId));
  }, []);

  return (
    <React.Fragment>
      <PageBack />

      <ImageContainer>
        <Img src={feed?.imgUrl} alt="인증이미지" />
      </ImageContainer>
      <ContainerGrid>
        {feed && (
          <Comment>
            <div>{feed.challengeTitle}</div>
            <div>{feed.comment}</div>
            <div>{feed.createdAt.slice(0, 10)}</div>
          </Comment>
        )}
      </ContainerGrid>
    </React.Fragment>
  );
};

const ImageContainer = styled.div`
  height: 54.5vh;
  margin-bottom: 2.75rem;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Comment = styled.div`
  & > div {
    &:nth-child(1) {
      font-size: 1.375rem;
      font-weight: 700;
      line-height: 1.813rem;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
      margin-bottom: 2.125rem;
    }
    &:nth-child(2) {
      font-size: 1.25rem;
      line-height: 1.625rem;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
      margin-bottom: 4.25rem;
    }
    &:nth-child(3) {
      font-size: 0.813rem;
      line-height: 1.063rem;
      letter-spacing: -0.005rem;
      color: #1d1b1b;
    }
  }
`;

export default MyFeed;
