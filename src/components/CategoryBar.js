import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";
const CategoryBar = () => {
  const dispatch = useDispatch();
  const [clickedCategory, changeClicked] = React.useState(0);
  const checkLoadAll = useSelector((state) => state.main.checkLoadAll);

  const categoryList = [
    "전체",
    "인기",
    "신규",
    "공부",
    "운동",
    "자기계발",
    "생활습관",
  ];

  // 메인헤더 클릭시에도 디폴트값으로 인덱스0번째인 "전체"가 색칠돼어있어야함
  // post.js에서 전체를 불러왔을때 state.post.checkLoadAll=true를 줘서 useEffect와 조건문을 사용하여 만듬
  React.useEffect(() => {
    if (checkLoadAll) {
      changeClicked(0);
    }
  }, [checkLoadAll]);
  return (
    <CategoryBox>
      {categoryList.map((e, i) => (
        <CategoryCircle
          key={i}
          onClick={() => {
            changeClicked(i);
            console.log(i);

            i === 0
              ? dispatch(mainActions.categoryDB())
              : dispatch(mainActions.categoryDB(e));
          }}
          style={{
            borderBottomColor: i === clickedCategory ? "#ff8b37" : "#ffffff",
          }}
        >
          {e}
        </CategoryCircle>
      ))}
    </CategoryBox>
  );
};

const CategoryBox = styled.div`
  height: 10vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: -10px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  @media only screen and (max-width: 768px) {
    margin-bottom: 0%;
    padding-bottom: 0px;
  }

  #CardWrap::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const CategoryCircle = styled.p`
  margin: 2%;
  font-size: 17px;
  padding: 5px 9px;
  color: #000;
  background-color: none;
  border-bottom: #ff8b37 solid;

  @media only screen and (max-width: 768px) {
    padding: 9px 9px;
    font-size: 14px;
  }
  cursor: pointer;
`;

export default CategoryBar;
