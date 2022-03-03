import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";

import styled from "styled-components";
import { history } from "../redux/configureStore";
// import Img01 from "../img/Recommend_test.png";
// import Img01 from "../img/Recommend_test";
// import Img01 from "./images/category_test";

// import Img01 from "/images";

const CategoryPost = (props) => {
  const Img01 = process.env.PUBLIC_URL + "/images";
  return (
    <React.Fragment>
      {/* 클릭 시 이동 일단 임의로 설정 */}
      <Card
        onClick={() => {
          history.push("/post/1");
        }}
      >
        {/* <Img src={process.env.PUBLIC_URL + "/images/Recommend_test.png"}></Img> */}
        {/* <Img src={process.env.PUBLIC_URL + "/images/Recommend_test.png"}></Img> */}
        {/* <Img src={Img01}></Img> */}
        <Img src={Img01 + "/Recommend_test.png"}></Img>
        <Text margin="2% 5%">타이틀이 들어가나용</Text>
        <Tag>
          <Text size="10px" alignCenter>
            작심삼일1일차
          </Text>
        </Tag>
      </Card>
    </React.Fragment>
  );
};

CategoryPost.defaultProps = {
  Img: "images/Recommend_test.png",
};

const Card = styled.div`
  margin: 10px 0px;
  cursor: pointer;
`;

const Img = styled.img`
  padding: 0% 4%;
  size: 20px;
`;

const Tag = styled.div`
  display: inline-flex;
  background-color: beige;
  margin: 0% 3%;
  width: 90px;
  height: 20px;
  border-radius: 5px;
  align-items: center;
`;
export default CategoryPost;
