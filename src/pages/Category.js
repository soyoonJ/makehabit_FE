import React from "react";
import styled from "styled-components";
import { Button, Input, Text, Image, Grid } from "../elements";

import CategoryPost from "../components/CategoryPost";

const Category = () => {
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
      </CardWrap>
    </Container>
  );
};

const Container = styled.div`
  overflow-x: hidden;
  margin: 0% 3% 0% 3%;
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
  display: flex;
  justify-content: space-around;
`;

export default Category;
