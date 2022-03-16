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
            <Text width="30%" size="22px" bold color="#FF8B37">
              로고부분
            </Text>
            <ContainerInput>
              <InputBox
                ref={search}
                placeholder="도전하고 싶은 습관을 검색해보세요!"
                width="65%"
              ></InputBox>

              <ImgBox
                style={{ width: "15px" }}
                src="images/icon_search.svg"
                alt=""
                onClick={() => {
                  dispatch(mainActions.getSearchDB(search.current.value));
                  history.push(`/search`);
                }}
              ></ImgBox>
            </ContainerInput>
          </Header>
        </ContainerGrid>

        {/*검색된 포스팅카드 불러오기 */}
        <CardWrap>
          {/*추천작심삼일 카테고리가 분류가 따로 없어서 length 수정필요 */}
          {searchWord_list?.map((p, idx) => {
            // console.log("검색리스트", p);
            return <CategoryPost key={p._id} {...p} />;
          })}
        </CardWrap>
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
`;
const Header = styled.div`
  margin: 10% 0% 2% 0%;
  display: flex;
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
`;

const ContainerInput = styled.div`
  margin-top: 21px;
  width: 70%;
  height: 29px;
  border-radius: 5px;
  background-color: #f7f7f7;
  align-items: center;
`;

const InputBox = styled.input`
  width: 70%;
  height: 29px;
  border: none;
  border-radius: 5px;
  background-color: #f7f7f7;
  outline: none;
`;
export default Search;
