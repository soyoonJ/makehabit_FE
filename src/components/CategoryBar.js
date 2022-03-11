import React from "react";
import styled from "styled-components";
import Horizontable from "./Horizontable";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";
const CategoryBar = () => {
  const dispatch = useDispatch();
  const [clickedCategory, changeClicked] = React.useState(0);
  const checkLoadAll = useSelector(
    // 카테고리 클릭시, 색상 변경하려고 아래코드 넣었는데 우선순위 뒤로감
    // (state) => state.main.category_list[0].category
    (state) => state.main.checkLoadAll
  );

  const categoryList = [
    ["all", "전체"],
    ["popular", "인기"],
    ["new", "신규"],
    ["study", "공부"],
    ["exercise", "운동"],
    ["self-development", "자기계발"],
    ["living-habit", "생활습관"],
  ];

  // 메인헤더 클릭시에도 디폴트값으로 인덱스0번째인 "전체"가 색칠돼어있어야함
  // post.js에서 전체를 불러왔을때 state.post.checkLoadAll=true를 줘서 useEffect와 조건문을 사용하여 만듬
  React.useEffect(() => {
    if (checkLoadAll) {
      changeClicked(0);
    }
  }, [checkLoadAll]);

  // console.log("카테고리색상변경", checkLoadAll);

  return (
    <CategoryBox>
      <Horizontable>
        {categoryList.map((e, i) => (
          <CategoryCircle
            key={e._id}
            onClick={() => {
              changeClicked(i);
              // console.log("카테고리바!!!!!!!!!!!!!!!", e[0], i);
              dispatch(mainActions.categoryDB(e[0]));
            }}
            style={{
              borderBottomColor: i === clickedCategory ? "#ff8b37" : "#ffffff",
            }}
          >
            {e[1]}
          </CategoryCircle>
        ))}
      </Horizontable>
    </CategoryBox>
  );
};

const CategoryBox = styled.div`
  height: 10vh;
  max-width: 420px;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  /* flex-wrap: nowrap; */
  /* margin-bottom: -10px; */
  overflow-x: hidden;
  white-space: nowrap;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    margin-bottom: 0%;
    padding-bottom: 0px;
  }

  div {
    display: inline-block;
  }
`;

const CategoryCircle = styled.p`
  margin: 2%;
  font-size: 17px;
  padding: 5px 9px;
  color: #000;
  background-color: none;
  border-bottom: #ff8b37 solid;
  display: inline-block;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 9px 9px;
    font-size: 14px;
  }
  cursor: pointer;
`;

export default CategoryBar;
