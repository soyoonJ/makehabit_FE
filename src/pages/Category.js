import React, { useState } from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";

import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../redux/configureStore";
// import { useParams } from "react-router-dom";
import { actionCreators as mainActions } from "../redux/modules/main";
import CategoryBar from "../components/CategoryBar";
import { ReactComponent as GoBack } from "../img/icon_left.svg";
const Category = (props) => {
  const dispatch = useDispatch();
  const category_list = useSelector((state) => state.main.category_list);

  console.log("카테고리리스트", category_list);

  // 새로고침 해도 현재카테고리를 보여 줄 수 있도록
  const categoryId = props.match.params.id;
  //메인페이지 화면 로드 할 때, 바로 카테고리 조회 할 수 있도록
  //렌더링이 끝나면 무조건 한번은 실행시켜주도록 하는것!

  React.useEffect(() => {
    // console.log("호호호호호");
    //   setLoading(false);
    // }, [id])
    dispatch(mainActions.categoryDB(categoryId));
  }, []);

  return (
    <ContainerGrid>
      <Container>
        <Header>
          <GoBack
            style={{
              margin: "auto",
              fill: "#707070",
            }}
            onClick={() => {
              history.goBack();
            }}
          />
          <Text alignCenter size="22px" bold>
            카테고리
          </Text>
        </Header>
        <CategoryBarWrap>
          <CategoryBar></CategoryBar>
        </CategoryBarWrap>

        <CardWrap>
          {category_list?.map((p, idx) => {
            // console.log("피", p);
            return <CategoryPost key={p._id} {...p} />;
          })}
        </CardWrap>
      </Container>
      <ButtonNavigation />
    </ContainerGrid>
  );
};

const Container = styled.div`
  /* overflow-x: hidden; */
  margin-bottom: 120px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;
// const Container = styled.div`
//   overflow-x: auto;
// `;

const CategoryBarWrap = styled.div`
  /* margin-top: 5%; */
  display: flex;
  justify-content: space-around;
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  gap: 1rem;
`;

export default Category;
