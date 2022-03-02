import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";

import styled from "styled-components";
import { history } from "../redux/configureStore";

const CategoryPost = () => {
  return (
    <React.Fragment>
      <Card>
        <Img src="imges/Recommend_test.png"></Img>
        <Text margin="7% 5%">타이틀이 들어가나용</Text>
        <Tag>
          <Text size="10px" margin="8% auto" alignCenter>
            작심삼일1일차
          </Text>
        </Tag>
      </Card>
    </React.Fragment>
  );
};

const Card = styled.div`
  display: grid;
`;
const Img = styled.img`
  padding: 0% 4%;
  size: 20px;
`;

const Tag = styled.div`
  background-color: beige;
  margin: 0% 5%;
  width: 90px;
  height: 30px;
  border-radius: 5px;
`;
export default CategoryPost;
