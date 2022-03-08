import React from "react";
import styled from "styled-components";
import { Button, Input, Text, Image, Grid } from "../elements";

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
        <Header>
          <Image size="40" src="images/logoEx.png" alt=""></Image>
          <Input
            _ref={search}
            placeholder="도전하고 싶은 습관을 검색해보세요!"
            width="65%"
          ></Input>
          <Img
            style={{ width: "20px" }}
            src="images/search.png"
            alt=""
            onClick={() => {
              dispatch(mainActions.getSearchDB(search.current.value));
            }}
          ></Img>
        </Header>
        {/*검색된 포스팅카드 불러오기 */}
        <CardWrap>
          {/*추천작심삼일 카테고리가 분류가 따로 없어서 length 수정필요 */}
          {searchWord_list?.map((p, idx) => {
            console.log("검색리스트", p);
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
export default Search;
