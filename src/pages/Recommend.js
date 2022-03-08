import React from "react";
import { Grid, Text, Input, Image, Button } from "../elements";

import styled from "styled-components";
import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { actionCreators as mainActions } from "../redux/modules/main";

import { useDispatch, useSelector } from "react-redux";

const Recommend = (props) => {
  const recommend_list = useSelector((state) => state.main.recommend_list);
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log("호호호호호");
    dispatch(mainActions.RecommendDB(""));
  }, []);

  return (
    <React.Fragment>
      <Header>
        <Text alignCenter size="20px" bold>
          추천 작심삼일
        </Text>
      </Header>
      <hr></hr>
      <Container>
        <Banner src="images/banner_02.png" alt=""></Banner>
        <CardWrap>
          {/*추천작심삼일 카테고리가 분류가 따로 없어서 length 수정필요 */}
          {recommend_list?.map((p, idx) => {
            console.log("피", p);
            return <CategoryPost key={p._id} {...p} />;
          })}
        </CardWrap>
      </Container>
      <ButtonNavigation />
    </React.Fragment>
  );
};

const Container = styled.div`
  overflow-x: hidden;
  margin: 0% 3%;
`;

const Header = styled.div`
  margin: 3% 0%;
  display: flex;
  justify-content: space-around;
  text-align: center;
`;
//슬라이드 배너 작업
const Banner = styled.img`
  display: block;
  margin: 3% auto 7% auto;
`;

const CardWrap = styled.div`
  // display: flex;
  // margin: 0% 3% 0% 2%;
  // justify-content: space-around;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

export default Recommend;
