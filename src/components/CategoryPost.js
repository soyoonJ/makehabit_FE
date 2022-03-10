import React from "react";

import { Grid, Text, Input, Image, Button } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
// import Img01 from "../img/Recommend_test.png";
// import Img01 from "../img/Recommend_test";
// import Img01 from "./images/category_test";

// import Img01 from "/images";

const CategoryPost = (props) => {
  const dispatch = useDispatch();
  const Img01 = process.env.PUBLIC_URL + "/images";
  // "이미지","타이틀이 들어가나용" > 밑에 변수값으로 나중에 변경
  const { thumbnail, title, tags, challengeId, puls } = props;
  // console.log("카테고리포스트", props);

  //글자수체크
  let titleLength = title.length;
  let subtitle = title.substring(0, 7);
  // console.log(subtitle);

  return (
    <React.Fragment>
      {/* 클릭 시 이동 일단 임의로 설정 */}
      <Card
        onClick={() => {
          // history.push("/challenge/1");
          dispatch(postActions.getDetailPostDB(challengeId));
        }}
      >
        {/* <Img src={process.env.PUBLIC_URL + "/images/Recommend_test.png"}></Img> */}
        {/* <Img src={process.env.PUBLIC_URL + "/images/Recommend_test.png"}></Img> */}
        {/* <Img src={Img01}></Img> */}
        {/* <Img src={Img01 + "/Recommend_test.png"}></Img> */}
        <Img src={thumbnail} />
        <Text margin="2% 5%">
          {title}
          {titleLength > 10 ? puls : ""}
        </Text>
        <Tag>
          <Text size="10px" alignCenter>
            {tags}
          </Text>
        </Tag>
      </Card>
    </React.Fragment>
  );
};

CategoryPost.defaultProps = {
  puls: "...",
  img: "ihttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaw8iLInSA0YTMGUXPAGcrG4ZvLC8PGrs8lZloBXFYYxI3DNCV7nVLmM83ojgAxMkQaA8&usqp=CAU",
  title:
    "타이틀 변수로 변경해라, 이거 길어지면 어떻게 나오닝?너 지금 뭐하고 있니?",
  tags: "작심삼일이다",
};

const Card = styled.div`
  /* margin: 10px 0px; */
  cursor: pointer;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 160px;
`;

const Img = styled.img`
  /* padding: 0% 4%; */
  width: 167px;
  height: 167px;
  max-width: 150px;
  max-height: 150px;
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
