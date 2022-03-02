import React from "react";

import { history } from "../redux/configureStore";
import { Grid, Text, Input, Image } from "../elements";

import styled from "styled-components";

const MyFeed = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Back
          onClick={() => {
            history.replace("/mychallenge");
          }}
        >
          뒤로
        </Back>

        <div style={{ display: "flex" }}>
          <Img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWmH9kAbB1WcW1bZn30ACcK1KUDOeWZkzyng&usqp=CAU"
            alt="인증이미지"
          ></Img>
        </div>

        <Comment>
          <div>타이틀</div>
          <div>코멘트</div>
        </Comment>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  height: 100vh;
  background: black;
`;
const Back = styled.div`
  cursor: pointer;
  z-index: 10;
  padding: 10px;
  color: white;
  position: absolute;
`;
const Img = styled.img`
  width: 100%;
  height: auto;
  z-index: 0;
  display: block;
  margin: auto;
`;
const Comment = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px;
  color: white;
`;

export default MyFeed;
