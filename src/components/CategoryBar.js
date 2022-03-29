import React from "react";
import styled from "styled-components";
import Horizontable from "./Horizontable";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";
import { history } from "../redux/configureStore";

const CategoryBar = (props) => {
  const dispatch = useDispatch();
  const { categoryId } = props;

  const categoryList = [
    ["all", "전체"],
    ["popular", "인기"],
    ["new", "신규"],
    ["study", "공부"],
    ["exercise", "운동"],
    ["self-development", "자기계발"],
    ["living-habit", "생활습관"],
    ["eco", "에코"],
  ];

  return (
    <CategoryBox>
      <Horizontable>
        {categoryList.map((e, i) => (
          <CategoryCircle
            key={e._id}
            onClick={() => {
              dispatch(mainActions.categoryDB(e[0]));
              history.push(`/category/${e[0]}`);
            }}
            style={{
              borderBottomColor: e[0] === categoryId ? "#ff8b37" : "#9C9C9C",
              fontWeight: e[0] === categoryId ? "800" : "400",
              // background: e[0] === categoryId ? "black" : "yellow",
              minWidth: "90px",
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
  height: 8vh;
  width: 100%;
  max-width: 420px;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  /* flex-wrap: nowrap; */
  /* margin-bottom: -10px; */
  overflow-x: hidden;
  white-space: nowrap;
  flex-direction: column;
  /* border-bottom: 2px gray solid; */

  /* @media only screen and (max-width: 768px) {
    margin-bottom: 0%;
    padding-bottom: 0px;
  } */

  div {
    display: inline-block;
  }
`;

const CategoryCircle = styled.p`
  /* margin: 2%; */
  font-weight: 400;
  font-size: 17px;
  padding: 5px 9px;
  color: #000;
  background-color: none;
  /* border-bottom: #ff8b37 solid; */
  display: inline-block;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px #9c9c9c solid;

  text-align: center;

  @media only screen and (max-width: 768px) {
    /* padding: 9px 9px; */
    font-size: 14px;
  }
  cursor: pointer;
`;

export default CategoryBar;
