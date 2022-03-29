import React, { useState } from "react";
import styled from "styled-components";
import { Text, ContainerGrid, Button } from "../elements";
import MetaTag from "../shared/MetaTag";

import Horizontable from "../components/Horizontable";

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

  // 새로고침 해도 현재카테고리를 보여 줄 수 있도록
  const categoryId = props.match.params.id;
  // console.log(categoryId);
  //메인페이지 화면 로드 할 때, 바로 카테고리 조회 할 수 있도록
  //렌더링이 끝나면 무조건 한번은 실행시켜주도록 하는것!

  React.useEffect(() => {
    // console.log("호호호호호");
    //   setLoading(false);
    // }, [id])
    dispatch(mainActions.categoryDB(categoryId));
  }, [categoryId]);

  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 카테고리별 조회" />

      <ContainerGrid>
        <Header>
          <GoBack
            style={{
              margin: "auto",
              fill: "#707070",
            }}
            onClick={() => {
              history.push("/");
            }}
          />
          <Text alignCenter size="22px" bold>
            카테고리
          </Text>
        </Header>
      </ContainerGrid>

      <CategoryBar categoryId={categoryId}></CategoryBar>

      <ContainerGrid margin="0 0 14.6vh">
        {category_list?.length === 0 ? (
          <NoChallenge>
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "/images/illust_question_samkki.png"
                }
                alt="상단 캐릭터 일러스트"
                style={{ height: "26.77vh" }}
              />
            </div>
            <Text size="24px" bold margin="0px 0px 5px 0px">
              찾으시는 챌린지가 없어요!
            </Text>
            <Text size="20px" margin="0px 0px 5px 0px">
              새로운 챌린지를 개설하셔서
            </Text>
            <Text size="20px" margin="0px 0px 5px 0px">
              습관을 만들어 볼까요?
            </Text>
            <br />
            <Button
              bg="#FF8B37"
              margin="44px 0px 0px 0px"
              height="67px"
              _onClick={() => {
                history.push("/postwrite");
              }}
              fontSize="22px"
            >
              습관만들러 가기
            </Button>
          </NoChallenge>
        ) : (
          <div>
            <CardWrap>
              {category_list?.map((p, idx) => {
                // console.log("피", p);
                return <CategoryPost key={p._id} {...p} />;
              })}
            </CardWrap>
          </div>
        )}
      </ContainerGrid>
      <ButtonNavigation />
    </React.Fragment>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;
// const Container = styled.div`
//   overflow-x: auto;
// `;

const CategoryBarWrap = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-around;
`;

const CardWrap = styled.div`
  margin-top: 2.6vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  align-items: baseline;
`;

// 챌린지 없을 때 띄워줌
const NoChallenge = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 60px;
`;

export default Category;
