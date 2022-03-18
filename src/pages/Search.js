import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";
import ButtonNavigation from "../components/ButtonNavigation";
import CategoryPost from "../components/CategoryPost";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";

const Search = () => {
  const dispatch = useDispatch();
  const search = React.useRef(null);
  const searchWord_list = useSelector((state) => state.main.searchWord_list);
  //   React.useEffect(() => {
  //     dispatch(mainActions.getSearchDB());
  //   }, []);

  return (
    <React.Fragment>
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
          <CardWrap>
            {/*추천작심삼일 카테고리가 분류가 따로 없어서 length 수정필요 */}
            {searchWord_list?.map((p, idx) => {
              // console.log("검색리스트", p);
              return <CategoryPost key={p._id} {...p} />;
            })}
          </CardWrap>
        </ContainerGrid>

        <ButtonNavigation></ButtonNavigation>
      </Container>
    </React.Fragment>
  );
};

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

const ImgBox = styled.img`
  height: 20px;
  width: 20px;

  margin-left: 20%;
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
