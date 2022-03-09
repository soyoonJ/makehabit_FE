import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";

import styled from "styled-components";
import { history } from "../redux/configureStore";

const ConfirmPost = (props) => {
  const { thumbnail, title, round } = props;
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
          <div>{title}</div>
          <Badge>도전 {round}회차</Badge>
        </div>
        <Button
          width="6rem"
          _onClick={() => {
            history.replace(`/confirm/${props.challengeId}`);
            // history.replace("/confirm/${props.id}");
          }}
        >
          오늘의 인증
        </Button>
      </TextContainer>
    </GridBox>
  );
};

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 16px 2fr;
`;
const ImageContainer = styled.div`
  width: 100%;
  grid-column: 1/3;
`;
const PostImage = styled.img`
  width: 100%;
  // height: 100px;
  // border-radius: 10px;
  // border: none;
  // background: #eee;
  // margin-bottom: 10px;
`;

const TextContainer = styled.div`
  grid-column: 3/3;
  // display: flex;
  // justify-content: space-between;

  // & > div > div {
  //   &:nth-child(1) {
  //     font-weight: bold;
  //   }
  // }
`;

const Badge = styled.div`
  // border: 1px solid #ddd;
  // border-radius: 10px;
  // width: 80px;
`;

export default ConfirmPost;
