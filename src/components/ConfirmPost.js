import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";

import styled from "styled-components";
import { history } from "../redux/configureStore";

const ConfirmPost = (props) => {
  const { thumbnail, title, round, content } = props;
  return (
    <GridBox>
      <ImageContainer>
        <PostImage
          src={thumbnail}
          onClick={() => {
            history.push(`/post/${props.challengeId}`);
          }}
        ></PostImage>
      </ImageContainer>
      <TextContainer>
        <div>
          <Title>{title}</Title>
          <Round>
            <span>{round}세트</span> 진행중
          </Round>
        </div>
        <Content
          style={{ color: "#707070", fontSize: "0.8rem", lineHeight: "150%" }}
        >
          {content}
        </Content>
        <Button
          width="100%"
          bg="#FF8B37"
          fontSize="1rem"
          fontWeight="600"
          _onClick={() => {
            history.replace(`/confirm/${props.challengeId}`);
            // history.replace("/confirm/${props.id}");
          }}
        >
          오늘의 인증하기
        </Button>
      </TextContainer>
    </GridBox>
  );
};

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4%;
  margin: 5vh 0;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 15vh;
  grid-column: 1/1;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 15vh;
  object-fit: cover;
  border-radius: 10px;
`;

const TextContainer = styled.div`
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Round = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  & > span {
    color: #ff8b37;
  }
`;

const Content = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 2.4em;
`;
export default ConfirmPost;
