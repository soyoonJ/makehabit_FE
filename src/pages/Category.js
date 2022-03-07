import React from "react";
import styled from "styled-components";
import { Button, Input, Text, Image, Grid } from "../elements";

import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { actionCreators as mainActions } from "../redux/modules/main";
import CategoryBar from "../components/CategoryBar";

const Category = (props) => {
  const dispatch = useDispatch();
  const category_list = useSelector((state) => state.main.category_list);
  console.log(category_list);

  //메인페이지 화면 로드 할 때, 바로 카테고리 조회 할 수 있도록
  //렌더링이 끝나면 무조건 한번은 실행시켜주도록 하는것!
  React.useEffect(() => {
    dispatch(mainActions.categoryDB());
  }, []);

  return (
    <Container>
      <Text alignCenter size="20px" bold>
        전체보기
      </Text>
      <HeaderContainer>
        <CategoryBar></CategoryBar>
      </HeaderContainer>

      <CardWrap>
        {/* <CategoryPost></CategoryPost> */}
        {category_list.map((p, idx) => {
          return <CategoryPost key={p.id} {...p} />;
        })}
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
