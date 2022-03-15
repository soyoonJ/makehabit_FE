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
  // console.log("서치", search.current.value);
  React.useEffect(() => {
    dispatch(mainActions.RecommendDB(2));
  }, []);

  //추천작심삼일 리스트 가져오기
  const recommend_list = useSelector((state) => state.main.recommend_list);
  // console.log("useSelector 썻는데!!!!", recommend_list);

  return (
    <React.Fragment>
      <Container>
        <ContainerGrid>
          <Header>
            {/*로고 */}
            {/* <Image size="40" src="images/logoEx.png" alt=""></Image> */}
            <Text
              width="30%"
              size="20px"
              bold
              color="#FF8B37"
              margin="22px 10px 0px 0px"
            >
              로고부분
            </Text>
            <ContainerInput>
              <InputBox
                ref={search}
                placeholder="도전하고 싶은 습관을 검색해보세요!"
              ></InputBox>

              <ImgBox
                style={{ width: "20px" }}
                src="images/icon_search.svg"
                alt=""
                onClick={() => {
                  dispatch(mainActions.getSearchDB(search.current.value));
                  history.push(`/search`);
                }}
              ></ImgBox>
            </ContainerInput>
          </Header>
        </ContainerGrid>

        <Banner1 />
        <ContainerGrid>
          <Text size="20px" padding="5% 0 5% 5%" bold borderBox>
            카테고리
          </Text>
          <CategoryWrap>
            <Category>
              <Img
                width="76px"
                src="images/icon_all.svg"
                onClick={() => {
                  dispatch(mainActions.categoryDB("all"));
                  // history.push("/category");
                }}
              />
              <Text alignCenter>전체보기</Text>
            </Category>

            <Category>
              <Img
                width="76px"
                src="images/icon_best.svg"
                onClick={() => {
                  dispatch(mainActions.categoryDB("popular"));
                  // history.push("/category/popular");
                }}
              ></Img>
              <Text alignCenter>인기</Text>
            </Category>
            <Category>
              <Img
                width="76px"
                src="images/icon_new.svg"
                onClick={() => {
                  dispatch(mainActions.categoryDB("new"));
                  // history.push("/category/new");
                }}
              ></Img>
              <Text alignCenter>신규</Text>
            </Category>
            <Category>
              <Img
                width="76px"
                src="images/icon_book.svg"
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
                width="76px"
                src="images/icon_sport.svg"
                onClick={() => {
                  dispatch(mainActions.categoryDB("exercise"));
                  // history.push("/category/exercise");
                }}
              ></Img>
              <Text alignCenter>운동</Text>
            </Category>
            <Category>
              <Img
                width="76px"
                src="images/icon_lifestyle.svg"
                onClick={() => {
                  dispatch(mainActions.categoryDB("self-development"));
                  // history.push("/category/self-development");
                }}
              ></Img>
              <Text alignCenter>자기계발</Text>
            </Category>
            <Category>
              <Img
                width="76px"
                src="images/icon_sun.svg"
                onClick={() => {
                  dispatch(mainActions.categoryDB("living-habit"));
                  // history.push("/category/living-habit");
                }}
              ></Img>
              <Text alignCenter>생활습관</Text>
            </Category>
            <Category>
              <Img
                width="76px"
                src="images/icon_forest.svg"
                onClick={() => {
                  dispatch(mainActions.categoryDB("eco"));
                  // history.push("/category/eco");
                }}
              ></Img>
              <Text alignCenter>에코</Text>
            </Category>
          </CategoryWrap>

          <RecommendTitle>
            <Text size="20px" bold>
              추천 작심삼일
            </Text>
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
  margin-bottom: 100px;
`;

const Header = styled.div`
  margin: 1.625em 0;
  display: flex;
`;

const ContainerInput = styled.div`
  margin-top: 21px;
  width: 100%;
  height: 32px;
  border-radius: 5px;
  background-color: #f7f7f7;
  align-items: center;
  display: flex;
`;

const InputBox = styled.input`
  width: 16.188em;
  height: 27px;
  border: none;
  border-radius: 5px;
  background-color: #f7f7f7;
  outline: none;
  size: 5px;
  ::placeholder {
    font-size: 12px;
    margin-left: 10px;
  }
`;

const ImgBox = styled.img`
  height: 20px;
  width: 10%;
  margin-left: 8%;
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
  font-size: 20px;
  color: #707070;
`;

export default Main;
