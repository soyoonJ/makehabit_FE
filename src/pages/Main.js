import React, { Component } from "react";
import styled from "styled-components";
import { Button, Input, Text, Image, Grid, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as mainActions } from "../redux/modules/main";

import ButtonNavigation from "../components/ButtonNavigation";
import Banner1 from "../components/Banner1";
import { useDispatch, useSelector } from "react-redux";
import Recommend from "./Recommend";
import CategoryPost from "../components/CategoryPost";

const Main = (props) => {
  //메인헤더 검색 키워드를 서버 보내주기 위한 작업
  //1. dispatch > useRef > 어떤 버튼 클릭시 적용되니깐 그 버튼에 입력값 넣기
  //ㄴ dispatch(mainActions.getSearchDB(search.current.value))
  const dispatch = useDispatch();
  const search = React.useRef(null);

  React.useEffect(() => {
    dispatch(mainActions.RecommendDB(2));
  }, []);

  //추천작심삼일 리스트 가져오기
  const recommend_list = useSelector((state) => state.main.recommend_list);
  // console.log("useSelector 썻는데!!!!", recommend_list);

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
              history.push(`/search`);
            }}
          ></Img>
        </Header>
        <Banner1 />
        <ContainerGrid>
          <Text padding="5% 0 5% 5%" bold borderBox>
            카테고리
          </Text>
          <CategoryWrap>
            <Category>
              <Img
                src="images/category_test.png"
                onClick={() => {
                  dispatch(mainActions.categoryDB("all"));
                  // history.push("/category");
                }}
              />
              <Text alignCenter>전체보기</Text>
            </Category>

            <Category>
              <Img
                src="images/category_test.png"
                onClick={() => {
                  dispatch(mainActions.categoryDB("popular"));
                  // history.push("/category/popular");
                }}
              ></Img>
              <Text alignCenter>인기</Text>
            </Category>
            <Category>
              <Img
                src="images/category_test.png"
                onClick={() => {
                  dispatch(mainActions.categoryDB("new"));
                  // history.push("/category/new");
                }}
              ></Img>
              <Text alignCenter>신규</Text>
            </Category>
            <Category>
              <Img
                src="images/category_test.png"
                onClick={() => {
                  dispatch(mainActions.categoryDB("study"));
                  // history.push("/category/study");
                }}
              ></Img>
              <Text alignCenter>공부</Text>
            </Category>
          </CategoryWrap>
          <CategoryWrap>
            <Category>
              <Img
                src="images/category_test.png"
                onClick={() => {
                  dispatch(mainActions.categoryDB("exercise"));
                  // history.push("/category/exercise");
                }}
              ></Img>
              <Text alignCenter>운동</Text>
            </Category>
            <Category>
              <Img
                src="images/category_test.png"
                onClick={() => {
                  dispatch(mainActions.categoryDB("self-development"));
                  // history.push("/category/self-development");
                }}
              ></Img>
              <Text alignCenter>자기계발</Text>
            </Category>
            <Category>
              <Img
                src="images/category_test.png"
                onClick={() => {
                  dispatch(mainActions.categoryDB("living-habit"));
                  // history.push("/category/living-habit");
                }}
              ></Img>
              <Text alignCenter>생활습관</Text>
            </Category>
            <Category>
              <Img
                src="images/category_test.png"
                onClick={() => {
                  dispatch(mainActions.categoryDB("eco"));
                  // history.push("/category/eco");
                }}
              ></Img>
              <Text alignCenter>에코</Text>
            </Category>
          </CategoryWrap>

          <RecommendTitle>
            <Text bold>추천 작심삼일</Text>
            <PlusButton
              onClick={() => {
                dispatch(mainActions.RecommendDB(10));
                history.push("/recommend");
              }}
            >
              더보기
            </PlusButton>
          </RecommendTitle>
          <RecommendWrap>
            {/* <CategoryPost></CategoryPost>
            <CategoryPost></CategoryPost> */}
            {recommend_list?.map((p, idx) => {
              return <CategoryPost key={p._id} {...p} />;
            })}
          </RecommendWrap>

          <RecommendTitle>
            <Text bold>캐릭터 갤러리</Text>
            <PlusButton>더보기</PlusButton>
          </RecommendTitle>
          <RecommendWrap>
            <Img src="images/Recommend_test.png"></Img>
            <Img src="images/Recommend_test.png"></Img>
          </RecommendWrap>
        </ContainerGrid>
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

const CategoryWrap = styled.div`
  margin-top: 2%;
  display: flex;
  justify-content: space-around;
`;

const Category = styled.div`
  display: grid;
  justify-content: center;
`;

const Img = styled.img`
  size: 20px;
  cursor: pointer;
`;

//추천 작심삼일
const RecommendWrap = styled.div`
  margin-top: 4%;
  display: flex;
  justify-content: space-around;
`;

const RecommendTitle = styled.div`
  display: flex;
  margin: 0% 5% 0% 5%;
`;

const RecommendImg = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: -10px;
`;
const PlusButton = styled.button`
  width: 40%;
  border: 0;
  background-color: white;
  text-align: right;
`;

export default Main;
