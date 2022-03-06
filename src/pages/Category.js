import React from "react";
import styled from "styled-components";
import { Button, Input, Text, Image, Grid } from "../elements";

import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { useDispatch } from "react-redux";

import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { actionCreators as mainActions } from "../redux/modules/main";
import CategoryBar from "../components/CategoryBar";

const Category = (props) => {
  // 카테고리 클릭시 색 변하게 하는 부분
  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);
  const category = useParams();

  const GetClick = (e) => {
    setCurrentClick(e.target);
    console.log(e.target);
  };

  //메인페이지 화면 로드 할 때, 바로 카테고리 조회 할 수 있도록
  //렌더링이 끝나면 무조건 한번은 실행시켜주도록 하는것!
  React.useEffect((e) => {
    // dispatch(mainActions.categoryDB("안녕하세여"));
  }, []);
  const dispatch = useDispatch();

  return (
    <Container>
      <Text alignCenter size="20px" bold>
        전체보기
      </Text>
      <HeaderContainer>
        <CategoryBar></CategoryBar>
      </HeaderContainer>

      {/* <HeaderContainer>
        <CategoryBar>
          <CategoryButton
            id="all"
            onClick={() => {
              GetClick("all");
              dispatch(mainActions.categoryDB("all"));
              history.push("/category/all");
            }}
          >
            전체보기
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              dispatch(mainActions.categoryDB("popular"));
              history.push("/category/popularll");
            }}
          >
            인기
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              dispatch(mainActions.categoryDB("new"));
              history.push("/category/new");
            }}
          >
            신규
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              dispatch(mainActions.categoryDB("study"));
              history.push("/category/study");
            }}
          >
            공부
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              dispatch(mainActions.categoryDB("exercise"));
              history.push("/category/exercise");
            }}
          >
            운동
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              dispatch(mainActions.categoryDB("self-development"));
              history.push("/category/self-development");
            }}
          >
            자기계발
          </CategoryButton>
          <CategoryButton
            onClick={() => {
              dispatch(mainActions.categoryDB("living_habit"));
              history.push("/category/living_habi");
            }}
          >
            생활습관
          </CategoryButton>
        </CategoryBar>
      </HeaderContainer>
      <hr></hr> */}
      <CardWrap>
        <CategoryPost></CategoryPost>
        <CategoryPost></CategoryPost>
        <CategoryPost></CategoryPost>
      </CardWrap>
      <ButtonNavigation />
    </Container>
  );
};

const Container = styled.div`
  overflow-x: hidden;
`;

const HeaderContainer = styled.div`
  margin: 5% 0% 2% 0%;
  display: flex;
  justify-content: space-around;
`;

// const CategoryBar = styled.div`
//   width: auto;
// `;

const CategoryButton = styled.button`
  border: 0;
  outline: 0;
  background-color: white;
  margin: 1% 1%;
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 0% 3% 0% 3%;
`;

export default Category;
