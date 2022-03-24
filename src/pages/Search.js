import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid, Button } from "../elements";
import { history } from "../redux/configureStore";
import ButtonNavigation from "../components/ButtonNavigation";
import CategoryPost from "../components/CategoryPost";
import MetaTag from "../shared/MetaTag";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";

const Search = () => {
  const dispatch = useDispatch();
  const search = React.useRef(null);
  const searchWord_list = useSelector((state) => state.main.searchWord_list);
  console.log("searchWord_list", searchWord_list);
  //   React.useEffect(() => {
  //     dispatch(mainActions.getSearchDB());
  //   }, []);
  const QuesetionImg =
    process.env.PUBLIC_URL + "/images/illust_question_samkki.png";

  return (
    <React.Fragment>
      <MetaTag title={"습관삼끼 | " + search.current.value + " 검색결과"} />

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
              습관삼끼
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
          {/*검색된 포스팅카드 불러오기 */}
          {/* <CardWrap>
            {searchWord_list?.map((p, idx) => {
              // console.log("검색리스트", p);
              return <CategoryPost key={p._id} {...p} />;
            })}
          </CardWrap> */}
        </ContainerGrid>

        <ContainerGrid>
          {searchWord_list?.length === 0 ? (
            <NoChallenge>
              <div>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/illust_question_samkki.png"
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
            <CardWrap>
              {searchWord_list?.map((p, idx) => {
                // console.log("검색리스트", p);
                return <CategoryPost key={p._id} {...p} />;
              })}
            </CardWrap>
          )}
        </ContainerGrid>

        <ButtonNavigation></ButtonNavigation>
      </Container>
    </React.Fragment>
  );
};

const NoChallenge = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 96px;
`;

const Container = styled.div`
  /* overflow-x: hidden; */
  /* margin: 0% 3% 0% 3%; */
  margin: 0%;
  padding-bottom: 50px;
  margin-bottom: 100px;
`;
const Header = styled.div`
  /* margin: 26px 0; */
  display: flex;
  margin-bottom: 20px;
`;

const QuesetionImg = styled.img`
  height: 26.77vh;
  margin-top: 96px;
`;

const Img = styled.img`
  size: 20px;
  cursor: pointer;
`;
const CardWrap = styled.div`
  // display: flex;
  // margin: 0% 3% 0% 2%;
  // justify-content: space-around;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  gap: 0 4.1%;
  margin-bottom: 6.51vh;
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
const SearchIcon = styled.img`
  height: 20px;
  width: 10%;
  margin-left: 8%;
`;
export default Search;
