import React from "react";

import styled from "styled-components";

import ItemBox from "../components/ItemBox";
import ItemCircle from "../components/ItemCircle";

import { useDispatch } from "react-redux";
import { actionCreators as characterActions } from "../redux/modules/character";
import Horizontable from "./Horizontable";

const ItemSelect = (props) => {
  const dispatch = useDispatch();
  const ItemCategory = [
    ["컬러", "color"],
    ["배경", "background"],
    ["표정", "emotion"],
    ["의상", "clothes"],
    ["악세사리", "acc"],
  ];
  const [clickedCate, changeCate] = React.useState(0);

  React.useEffect(() => {
    dispatch(characterActions.getItemDB(ItemCategory[clickedCate][1]));
  }, [clickedCate]);

  return (
    <React.Fragment>
      <Navi>
        <Horizontable>
          <NaviButton>
            {ItemCategory.map((e, i) => (
              <div>
                <button
                  key={i}
                  onClick={() => {
                    changeCate(i);
                  }}
                  style={{
                    color: i === clickedCate ? "#FF8B37" : "#9c9c9c",
                    fontWeight: i === clickedCate ? "700" : "400",
                  }}
                >
                  {e[0]}
                </button>
                {i === clickedCate ? (
                  <hr style={{ width: i === 4 ? "113%" : "119%" }} />
                ) : (
                  ""
                )}
              </div>
            ))}
          </NaviButton>
        </Horizontable>
      </Navi>
      {clickedCate === 0 ? <ItemCircle /> : <ItemBox />}
    </React.Fragment>
  );
};

const Navi = styled.div`
  border-bottom: 1.5px solid #e0e0e0;
  height: 7.22vh;
`;

const NaviButton = styled.div`
  white-space: nowrap;
  display: flex;
  margin: 1.9vh 0;

  & > div {
    position: relative;
    button {
      width: auto;
      all: unset;
      font-size: 2.37vh;
      line-height: 3.317vh;
      margin: 0 0.813rem 0 1.875rem;
    }

    hr {
      position: absolute;
      height: 3px;
      background-color: #ff8b37;
      border: none;
      z-index: 10;
      bottom: -1.89vh;
      left: 0;
      margin: 0px;
    }
  }
`;

export default ItemSelect;
