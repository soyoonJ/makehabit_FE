import React from "react";
import styled from "styled-components";
import { Button, Input, Text, Image, Grid } from "../elements";

import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { useDispatch } from "react-redux";

import { actionCreators as mainActions } from "../redux/modules/main";

const Category = (props) => {
  //메인페이지 화면 로드 할 때, 바로 카테고리 조회 할 수 있도록
  //렌더링이 끝나면 무조건 한번은 실행시켜주도록 하는것!

  React.useEffect(() => {
    // dispatch(mainActions.categoryDB("안녕하세여"));
  }, []);
  const dispatch = useDispatch();

  return (
    <Container>
      <Text alignCenter size="20px" bold>
        전체보기
      </Text>
      <Header>
        <CategoryButton>전체보기</CategoryButton>
        <CategoryButton>인기</CategoryButton>
        <CategoryButton>신규</CategoryButton>
        <CategoryButton>공부</CategoryButton>
      </Header>
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

const Header = styled.div`
  margin: 5% 0% 2% 0%;
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const CategoryButton = styled.button`
  border: 0;
  outline: 0;
  background-color: white;
  margin-bottom: 7%;
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 0% 3% 0% 3%;
`;

//categorypost
const Card = styled.div`
  margin: 10px 0px;
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
export default Category;
