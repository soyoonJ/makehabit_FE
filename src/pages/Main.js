import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";

import ButtonNavigation from "../components/ButtonNavigation";
import Banner1 from "../components/Banner1";
import CategoryPost from "../components/CategoryPost";
import MetaTag from "../shared/MetaTag";
// import Spinner from "../shared/Spinner";
import Ranking from "../components/Ranking";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { actionCreators as mainActions } from "../redux/modules/main";
import { actionCreators as rankingActions } from "../redux/modules/ranking";
import { actionCreators as postActions } from "../redux/modules/post";

const Main = () => {
  //메인헤더 검색 키워드를 서버 보내주기 위한 작업
  //1. dispatch > useRef > 어떤 버튼 클릭시 적용되니깐 그 버튼에 입력값 넣기
  //ㄴ dispatch(mainActions.getSearchDB(search.current.value))
  const dispatch = useDispatch();

  // const isLoading = useSelector((state) => state.main.isLoading);
  // const [loading, setLoading] = React.useState(true);
  // console.log("서치", search.current.value);

  // const categoryId = props.match.params.id;
  const likeList = useSelector((state) => state.post.isLike);
  // const challengeId = props.match.params.id;

  React.useEffect(() => {
    // console.log("바뀌냐", likeList);
    dispatch(mainActions.RecommendDB(4));
    dispatch(mainActions.mainnewDB(4, "new"));
    dispatch(mainActions.mainstudyDB(4, "exercise"));
    dispatch(rankingActions.getRankingDB(3));
    // dispatch(postActions.getDetailPostDB(challengeId));
  }, [likeList]);

  React.useEffect(() => {
    dispatch(rankingActions.getRankingDB(3));
  }, []);

  //추천작심삼일 리스트 가져오기
  const recommend_list = useSelector((state) => state.main.recommend_list);
  const new_list = useSelector((state) => state.main.new_list);
  const study_list = useSelector((state) => state.main.study_list);

  //전체 랭킹데이터 가져오기
  const AllRanking = useSelector((state) => state.ranking?.ranking_list);

  //검색바
  const search = React.useRef(null);
  // 엔터키
  const handlePress = (e) => {
    if (e.key === "Enter") {
      searchBtn();
    }
  };

  const [mainKeyword, setKeyword] = React.useState("");

  const onChange = (e) => {
    setKeyword(e.target.value);
  };
  console.log("ddddd", setKeyword);

  const searchBtn = () => {
    dispatch(mainActions.getSearchDB(search.current.value));
    history.push(`/search`);
  }; //{}$$search.current.value)

  return (
    <Container>
      {/* <MetaTag title="습관삼끼" /> */}
      {/* {isLoading ? <Spinner /> : ""} */}
      {/* 스피너테스트 */}
      {/* <Spinner /> */}

      <Header>
        <ContainerGrid>
          {/*로고 */}
          <Logo
            src="/logo/logo_text.svg"
            alt="로고"
            onClick={() => {
              history.push(`/`);
            }}
          />
          <ContainerInput>
            <InputBox
              ref={search}
              onChange={onChange}
              onKeyPress={handlePress}
              placeholder="도전하고 싶은 습관을 검색해보세요!"
            ></InputBox>
            <Link
              to={{
                pathname: "/search",
                state: { mainKeyword: mainKeyword },
              }}
            >
              <SearchIcon
                style={{ width: "20px" }}
                src="images/icon_search.svg"
                alt=""
                onClick={searchBtn}
              ></SearchIcon>
            </Link>
          </ContainerInput>
        </ContainerGrid>
      </Header>

      <MarginTop />

      <Banner1 />

      <ContainerGrid margin="4.26vh 0 2.37vh 0">
        <Text size="20px" weight="700" borderBox>
          카테고리
        </Text>
        <CategoryWrap>
          <Category>
            <CategoryIcon>
              <Img
                width="50"
                height="50"
                src="images/icon_all.svg"
                alt="전체보기"
                onClick={() => {
                  // dispatch(mainActions.categoryDB("all"));
                  history.push("/category/all");
                }}
              />
            </CategoryIcon>
            <CategoryText alignCenter>전체보기</CategoryText>
          </Category>

          <Category>
            <CategoryIcon>
              <Img
                alignCenter
                width="50"
                height="48.98"
                alt="인기"
                src="images/icon_best.svg"
                onClick={() => {
                  // dispatch(mainActions.categoryDB("popular"));
                  history.push("/category/popular");
                }}
              ></Img>
            </CategoryIcon>
            <CategoryText alignCenter>인기</CategoryText>
          </Category>

          <Category>
            <CategoryIcon>
              <Img
                width="50"
                height="50.82"
                alt="신규"
                src="images/icon_new.svg"
                onClick={() => {
                  // dispatch(mainActions.categoryDB("new"));
                  history.push("/category/new");
                }}
              ></Img>
            </CategoryIcon>
            <CategoryText alignCenter>신규</CategoryText>
          </Category>

          <Category>
            <CategoryIcon>
              <Img
                width="50"
                height="49.21"
                alt="공부"
                src="images/icon_book.svg"
                onClick={() => {
                  // dispatch(mainActions.categoryDB("study"));
                  history.push("/category/study");
                }}
              ></Img>
            </CategoryIcon>
            <CategoryText alignCenter>공부</CategoryText>
          </Category>
        </CategoryWrap>

        <CategoryWrap>
          <Category>
            <CategoryIcon>
              <Img
                width="50"
                height="50"
                alt="운동"
                src="images/icon_sport.svg"
                onClick={() => {
                  // dispatch(mainActions.categoryDB("exercise"));
                  history.push("/category/exercise");
                }}
              ></Img>
            </CategoryIcon>
            <CategoryText alignCenter>운동</CategoryText>
          </Category>

          <Category>
            <CategoryIcon>
              <Img
                width="50"
                height="49.21"
                alt="자기계발"
                src="images/icon_lifestyle.svg"
                onClick={() => {
                  // dispatch(mainActions.categoryDB("self-development"));
                  history.push("/category/self-development");
                }}
              ></Img>
            </CategoryIcon>
            <CategoryText alignCenter>자기계발</CategoryText>
          </Category>

          <Category>
            <CategoryIcon>
              <Img
                width="50"
                height="50.82"
                alt="생활습관"
                src="images/icon_sun.svg"
                onClick={() => {
                  // dispatch(mainActions.categoryDB("living-habit"));
                  history.push("/category/living-habit");
                }}
              ></Img>
            </CategoryIcon>
            <CategoryText alignCenter>생활습관</CategoryText>
          </Category>

          <Category>
            <CategoryIcon>
              <Img
                width="50"
                height="49.21"
                alt="에코"
                src="images/icon_forest.svg"
                onClick={() => {
                  // dispatch(mainActions.categoryDB("eco"));
                  history.push("/category/eco");
                }}
              ></Img>
            </CategoryIcon>
            <CategoryText alignCenter>에코</CategoryText>
          </Category>
        </CategoryWrap>

        {/* 테마 카테고리 - 추천 작심삼끼 */}
        <RecommendTitle>
          <Text size="20px" weight="700" margin="2.48vh 0">
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
      </ContainerGrid>

      {/*랭킹리스트*/}
      <ContainerGrid>
        <RecommendTitle>
          <Text size="20px" weight="700" margin="2.48vh 0">
            습관삼끼 랭킹
          </Text>
          <PlusButton
            onClick={() => {
              history.push(`/ranking`);
            }}
          >
            더보기
          </PlusButton>
        </RecommendTitle>
      </ContainerGrid>

      <ListWrap>
        {AllRanking?.map((p, idx) => {
          return <Ranking key={p._id} {...p} />;
        })}
      </ListWrap>

      <ContainerGrid>
        {/* 테마 카테고리 - 따끈따끈 새챌린지 */}
        <RecommendTitle>
          <Text size="20px" weight="700" margin="2.48vh 0">
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
          <Text size="20px" weight="700" margin="2.48vh 0">
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
        {/* <Text margin="0" bold>
          습관삼끼
        </Text> */}
        <div>
          <img
            src="/logo/logo_text.svg"
            alt="로고"
            onClick={() => {
              history.push(`/`);
            }}
          />
        </div>

        <Text margin="0">@ hanghae99_C5</Text>
      </LogoBottom>
      <ButtonNavigation />
      <BottomMargin />
    </Container>
  );
};

const Logo = styled.img`
  width: 84px;
  margin-right: 5px;
  margin: 0px 10px 4px 0px;
  align-content: center;
`;
const Container = styled.div`
  margin: 0%;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;

  @media screen and (min-width: 420px) {
    max-height: 100vh;
    overflow: auto;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0px;
  margin: auto;
  z-index: 99;

  width: 100%;
  max-width: 420px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;

  & > div {
    display: flex;
    width: 100%;
  }
`;

const MarginTop = styled.div`
  margin-top: 5rem;
`;

const ContainerInput = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 5px;
  background-color: #f7f7f7;
  align-items: center;
  display: flex;
`;

const InputBox = styled.input`
  font-size: 13px;
  width: 100%;
  height: 29px;
  border: none;
  border-radius: 5px;
  background-color: #f7f7f7;
  outline: none;
  padding-left: 0.813rem;
  size: 5px;
  ::placeholder {
    font-size: 13px;
    margin-left: 10px;
  }
`;

const Img = styled.img`
  cursor: pointer;
`;

const SearchIcon = styled.img`
  height: 20px;
  width: 10%;
  margin-left: 8%;
  margin-right: 14px;
`;

const CategoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Category = styled.div`
  display: grid;
  justify-content: center;
  gap: 10px;
`;

const CategoryIcon = styled.div`
  width: 76px;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryText = styled.text`
  align-items: center;
  font-weight: 600;
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

  align-items: center;
  justify-content: center;
  align-content: center;

  & > div {
    width: 110px;
  }
`;

// 랭킹
const RankWarp = styled.div`
  margin-bottom: 40px;
`;
const ListWrap = styled.div`
  display: grid;
  margin-bottom: 2.25vh;
`;

const RankingList = styled.div`
  width: 100%;
  height: 8.76vh;
  background-color: #ffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px #f7f7f7 solid;

  & > div {
    width: 100%;
    max-width: 420px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // height: 100%;
    display: grid;
    grid-template-columns: 17.4% 12.8% 1fr 17.4%;
    align-items: center;
  }
`;

const RankNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
  }
`;

const Profile = styled.div`
  border-radius: 5px;
  width: 50px;
  height: 50px;
  margin-right: 18px;
  position: relative;
`;
const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  /* z-index: 1; */
  border-radius: 10px;
  object-fit: cover;
`;

const BottomMargin = styled.div`
  margin-bottom: 170px;
`;

export default Main;
