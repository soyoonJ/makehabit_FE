import React, { Component } from "react";
import styled from "styled-components";
import { Button, Input, Text, Image, Grid } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as mainActions } from "../redux/modules/main";

import ButtonNavigation from "../components/ButtonNavigation";
import Banner1 from "../components/Banner1";
import { useDispatch } from "react-redux";

const Main = () => {
  //메인헤더 검색 키워드를 서버 보내주기 위한 작업
  //1. dispatch > useRef > 어떤 버튼 클릭시 적용되니깐 그 버튼에 입력값 넣기
  //ㄴ dispatch(mainActions.getSearchDB(search.current.value))
  const dispatch = useDispatch();
  const search = React.useRef(null);

  return (
    <React.Fragment>
      <Container>
        <Header>
          <Image size="40" src="images/logoEx.png" alt=""></Image>
          <Input
            _ref={search}
            placeholder="도전하고 싶은 습관을 검색해보세요!"
            width="65%"
          ></Input>
          <Img
            style={{ width: "20px" }}
            src="images/search.png"
            alt=""
            onClick={() => {
              dispatch(mainActions.getSearchDB(search.current.value));
            }}
          ></Img>
        </Header>
        <Banner1 />

        <Text margin="5% 5%" bold>
          카테고리
        </Text>
        <CategoryWrap>
          <Img
            src="images/category_test.png"
            onClick={() => {
              dispatch(mainActions.categoryDB("공부"));
              history.push("/category/공부");
            }}
          />
          <Img
            src="images/category_test.png"
            onClick={() => {
              dispatch(mainActions.categoryDB("운동"));
              history.push("/category/운동");
            }}
          ></Img>
          <Img src="images/category_test.png"></Img>
          <Img src="images/category_test.png"></Img>
        </CategoryWrap>
        <CategoryWrap>
          <Img src="images/category_test.png"></Img>
          <Img src="images/category_test.png"></Img>
          <Img src="images/category_test.png"></Img>
          <Img src="images/category_test.png"></Img>
        </CategoryWrap>
        <RecommendWrap>
          <RecommendTitle>
            <Text bold>추천 작심삼일</Text>
            <Text>더보기</Text>
          </RecommendTitle>
          <Img src="images/Recommend_test.png"></Img>
          <Img src="images/Recommend_test.png"></Img>
          <Img src="images/Recommend_test.png"></Img>
          <Img src="images/Recommend_test.png"></Img>
          <RecommendTitle>
            <Text bold>캐릭터 갤러리</Text>
            <Text>더보기</Text>
          </RecommendTitle>
          <Img src="images/Recommend_test.png"></Img>
          <Img src="images/Recommend_test.png"></Img>
          <Img src="images/Recommend_test.png"></Img>
          <Img src="images/Recommend_test.png"></Img>
          <Img src="images/Recommend_test.png"></Img>
          <Img src="images/Recommend_test.png"></Img>
        </RecommendWrap>
      </Container>
      <ButtonNavigation />
    </React.Fragment>
  );
};

const Container = styled.div`
  /* overflow-x: hidden; */
  /* margin: 0% 3% 0% 3%; */
  margin: 0%;
  padding-bottom: 50px;
`;

const Header = styled.div`
  margin: 10% 0% 2% 0%;
  display: flex;
`;

//슬라이드 배너 작업
const Banner = styled.img`
  display: block;
  margin: 8% auto;
`;

const CategoryWrap = styled.div`
  margin-top: 2%;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  padding: 0% 4%;
  size: 20px;
  cursor: pointer;
`;

//추천 작심삼일
const RecommendWrap = styled.div`
  margin-top: 4%;
  justify-content: center;
`;

const RecommendTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0% 5% 0% 5%;
`;

export default Main;
