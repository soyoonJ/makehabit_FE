import React from "react";
import { Text, ContainerGrid } from "../elements";

import styled from "styled-components";
import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { actionCreators as mainActions } from "../redux/modules/main";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import { ReactComponent as LeftButoon } from "../img/icon_left.svg";
import { ReactComponent as BannerImg1 } from "../img/banner_02.png";

const Recommend = (props) => {
  const recommend_list = useSelector((state) => state.main.recommend_list);

  const categoryId = props.match.params.id;
  console.log("??????????", props.match.params);

  const dispatch = useDispatch();

  let title = "";
  let BannerImg = "";

  React.useEffect(() => {
    if (categoryId === "new") {
      dispatch(mainActions.RecommendDB(10, categoryId));
      // console.log("들어옸니!!!!!!!!!", categoryId);
    } else if (categoryId === "study") {
      dispatch(mainActions.RecommendDB(10, categoryId));
    } else {
      dispatch(mainActions.RecommendDB(10));
      console.log("추천");
    }
  }, []);

  if (categoryId === "new") {
    title = "따끈따끈 새챌린지";
    BannerImg = "/images/banner_01.png";
  } else if (categoryId === "study") {
    title = "스터디윗미";
    BannerImg = "/images/banner_02.png";
  } else {
    title = "추천 작심삼일";
    BannerImg = "/images/banner_03.png";
  }

  return (
    <React.Fragment>
      <ContainerGrid>
        <Header>
          <LeftButoon
            style={{
              margin: "auto",
              fill: "#707070",
            }}
            onClick={() => {
              history.goBack();
            }}
          />
          <Text alignCenter size="22px" bold>
            {title}
          </Text>
        </Header>

        <Container>
          <Banner src={BannerImg} />
          {/* <img src="/images/banner_01.png" /> */}
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
  /* display: block; */
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
