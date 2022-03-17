import React from "react";
import { Text, ContainerGrid } from "../elements";

import styled from "styled-components";
import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { actionCreators as mainActions } from "../redux/modules/main";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import { ReactComponent as GoBack } from "../img/icon_left.svg";
const Recommend = (props) => {
  const recommend_list = useSelector((state) => state.main.recommend_list);
  const dispatch = useDispatch();
  React.useEffect(() => {
    // console.log("호호호호호");
    dispatch(mainActions.RecommendDB(10));
  }, []);

  return (
    <React.Fragment>
      <ContainerGrid>
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
            추천 작심삼일
          </Text>
        </Header>

        <Container>
          <Banner src="images/banner_02.png"></Banner>
          <CardWrap>
            {/*추천작심삼일 카테고리가 분류가 따로 없어서 length 수정필요 */}
            {recommend_list?.map((p, idx) => {
              // console.log("피", p);
              return <CategoryPost key={p._id} {...p} />;
            })}
          </CardWrap>
        </Container>
      </ContainerGrid>
      <ButtonNavigation />
    </React.Fragment>
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
//슬라이드 배너 작업
const Banner = styled.img`
  display: block;
  margin: 3% auto 7% auto;
  width: 100%;
`;

const CardWrap = styled.div`
  // display: flex;
  // margin: 0% 3% 0% 2%;
  // justify-content: space-around;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  align-items: center;
`;

export default Recommend;
