import React, { Component } from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as mainActions } from "../redux/modules/main";
import { actionCreators as postActions } from "../redux/modules/post";

import ButtonNavigation from "../components/ButtonNavigation";
import Banner1 from "../components/Banner1";
import { useDispatch, useSelector } from "react-redux";

import CategoryPost from "../components/CategoryPost";

const Main = (props) => {
  //메인헤더 검색 키워드를 서버 보내주기 위한 작업
  //1. dispatch > useRef > 어떤 버튼 클릭시 적용되니깐 그 버튼에 입력값 넣기
  //ㄴ dispatch(mainActions.getSearchDB(search.current.value))
  const dispatch = useDispatch();
  const search = React.useRef(null);
  // console.log("서치", search.current.value);

  // const categoryId = props.match.params.id;
  const likeList = useSelector((state) => state.post.isLike);
  React.useEffect(() => {
    dispatch(mainActions.RecommendDB(2));
    dispatch(mainActions.mainnewDB(2, "new"));
    dispatch(mainActions.mainstudyDB(2, "exercise"));
  }, []);

  React.useEffect(() => {
    console.log("바뀌냐", likeList);
    dispatch(mainActions.RecommendDB(2));
    dispatch(mainActions.mainnewDB(2, "new"));
    dispatch(mainActions.mainstudyDB(2, "exercise"));
  }, [likeList]);

  //추천작심삼일 리스트 가져오기
  const recommend_list = useSelector((state) => state.main.recommend_list);
  const new_list = useSelector((state) => state.main.new_list);
  const study_list = useSelector((state) => state.main.study_list);
  // const maincategory_list = useSelector(
  //   (state) => state.main.maincategory_list
  // );
  // console.log("추천리스트", recommend_list);
  // console.log("뉴리스트", new_list);
  // console.log("스터디", new_list);
  // console.log("useSelector 썻는데!!!!", maincategory_list);

  return (
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
            로고닷닷
          </Text>
          <ContainerInput>
            <InputBox
              ref={search}
              placeholder="도전하고 싶은 습관을 검색해보세요!"
            ></InputBox>

            <SearchIcon
              style={{ width: "20px" }}
              src="images/icon_search.svg"
              alt=""
              onClick={() => {
                dispatch(mainActions.getSearchDB(search.current.value));
                history.push(`/search`);
              }}
            ></SearchIcon>
          </ContainerInput>
        </Header>
      </ContainerGrid>

      <Banner1 />
      <ContainerGrid>
        <Text size="20px" bold borderBox>
          카테고리
        </Text>
        <CategoryWrap>
          <Category>
            <Img
              width="50px"
              src="images/icon_all.svg"
              onClick={() => {
                // dispatch(mainActions.categoryDB("all"));
                history.push("/category/all");
              }}
            />
            <CategoryText bold alignCenter>
              전체보기
            </CategoryText>
          </Category>

          <Category>
            <Img
              alignCenter
              width="50px"
              src="images/icon_best.svg"
              onClick={() => {
                // dispatch(mainActions.categoryDB("popular"));
                history.push("/category/popular");
              }}
            ></Img>
            <CategoryText bold alignCenter>
              인기
            </CategoryText>
          </Category>
          <Category>
            <Img
              width="50px"
              src="images/icon_new.svg"
              onClick={() => {
                // dispatch(mainActions.categoryDB("new"));
                history.push("/category/new");
              }}
            ></Img>
            <CategoryText bold alignCenter>
              신규
            </CategoryText>
          </Category>
          <Category>
            <Img
              width="50px"
              src="images/icon_book.svg"
              onClick={() => {
                // dispatch(mainActions.categoryDB("study"));
                history.push("/category/study");
              }}
            ></Img>
            <CategoryText bold alignCenter>
              공부
            </CategoryText>
          </Category>
        </CategoryWrap>
        <CategoryWrap>
          <Category>
            <Img
              width="50px"
              src="images/icon_sport.svg"
              onClick={() => {
                // dispatch(mainActions.categoryDB("exercise"));
                history.push("/category/exercise");
              }}
            ></Img>
            <CategoryText bold alignCenter>
              운동
            </CategoryText>
          </Category>
          <Category>
            <Img
              width="50px"
              src="images/icon_lifestyle.svg"
              onClick={() => {
                // dispatch(mainActions.categoryDB("self-development"));
                history.push("/category/self-development");
              }}
            ></Img>
            <CategoryText bold alignCenter>
              자기계발
            </CategoryText>
          </Category>
          <Category>
            <Img
              width="50px"
              src="images/icon_sun.svg"
              onClick={() => {
                // dispatch(mainActions.categoryDB("living-habit"));
                history.push("/category/living-habit");
              }}
            ></Img>
            <CategoryText bold alignCenter>
              생활습관
            </CategoryText>
          </Category>
          <Category>
            <Img
              width="50px"
              src="images/icon_forest.svg"
              onClick={() => {
                // dispatch(mainActions.categoryDB("eco"));
                history.push("/category/eco");
              }}
            ></Img>
            <CategoryText bold alignCenter>
              에코
            </CategoryText>
          </Category>
        </CategoryWrap>

        {/* 테마 카테고리 - 추천 작심삼끼 */}
        <RecommendTitle>
          <Text size="20px" bold>
            추천 습관삼끼
          </Text>
          <PlusButton
            onClick={() => {
              dispatch(mainActions.RecommendDB(10));
              history.push("/recommend/first");
            }}
          >
            더보기
          </PlusButton>
        </RecommendTitle>

        <RecommendWrap>
          {recommend_list?.map((p, idx) => {
            return <CategoryPost key={p._id} {...p} />;
          })}
        </RecommendWrap>
        {/*★★★★★★map 부분 바꿔야함!!!!!!!!!!! */}

        {/* 테마 카테고리 - 따끈따끈 새챌린지 */}
        <RecommendTitle>
          <Text size="20px" bold>
            따끈따끈 새챌린지
          </Text>
          <PlusButton
            onClick={() => {
              history.push(`/recommend/new`);
            }}
          >
            더보기
          </PlusButton>
        </RecommendTitle>

        <RecommendWrap>
          {new_list?.map((p, idx) => {
            return <CategoryPost key={p._id} {...p} />;
          })}
        </RecommendWrap>

        {/* 테마 카테고리 - 운동 가보자고 */}
        <RecommendTitle>
          <Text size="20px" bold>
            운동 가보자고
          </Text>
          <PlusButton
            onClick={() => {
              history.push(`/recommend/exercise`);
            }}
          >
            더보기
          </PlusButton>
        </RecommendTitle>

        <RecommendWrap>
          {study_list?.map((p, idx) => {
            return <CategoryPost key={p._id} {...p} />;
          })}
        </RecommendWrap>
      </ContainerGrid>
      <LogoBottom>
        <Text>습관삼끼</Text>
        <Text>@hanghae99_C5</Text>
      </LogoBottom>
      <ButtonNavigation />
    </Container>
  );
};

const Container = styled.div`
  /* overflow-x: hidden; */
  /* margin: 0% 3% 0% 3%; */
  margin: 0%;
  // padding-bottom: 50px;
  margin-bottom: 100px;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  -ms-overflow-style: none;

  @media screen and (min-width: 420px) {
    max-height: 100vh;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  /* margin: 26px 0; */
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
  height: 29px;
  border: none;
  border-radius: 5px;
  background-color: #f7f7f7;
  outline: none;
  padding-left: 0.813rem;
  size: 5px;
  ::placeholder {
    font-size: 12px;
    margin-left: 10px;
  }
`;
const ImgBox = styled.div`
  width: 76px;
  height: 76px;
  display: grid;
`;
const Img = styled.img`
  cursor: pointer;
`;

const SearchIcon = styled.img`
  height: 20px;
  width: 10%;
  margin-left: 8%;
`;

const CategoryWrap = styled.div`
  /* margin-top: 2%; */
  display: flex;
  justify-content: space-around;
`;

const Category = styled.div`
  display: grid;
  justify-content: center;
`;

const CategoryText = styled.text`
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 27px;
  text-align: center;
`;

//추천 작심삼일
const RecommendWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 4.1%;
  margin-bottom: 1.5rem;
`;

const RecommendTitle = styled.div`
  display: flex;
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
  padding: 0;
  background-color: white;
  text-align: right;
  font-size: 20px;
  color: #707070;
`;

const LogoBottom = styled.div`
  display: grid;
  text-align: center;
  margin-top: 48px;
`;
export default Main;
