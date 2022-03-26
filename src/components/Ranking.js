import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";

import { actionCreators as rankingActions } from "../redux/modules/ranking";

import { useDispatch, useSelector } from "react-redux";

const Ranking = (props) => {
  const Item = process.env.PUBLIC_URL + "/items/large";
  const { equippedItems, nickname, proofCnt, rank } = props;
  const AllRanking = useSelector((state) => state.ranking.ranking_list);
  //   console.log("아이템", equippedItems[0]);
  return (
    <RankingList>
      {proofCnt > 0 ? (
        <div>
          <RankNum>{rank}</RankNum>
          <Profile>
            <ItemImg src={Item + equippedItems[0]?.itemImgUrl} />
            <ItemImg src={Item + equippedItems[1]?.itemImgUrl} />
            <ItemImg src={Item + equippedItems[2]?.itemImgUrl} />
            <ItemImg src={Item + equippedItems[3]?.itemImgUrl} />
            <ItemImg src={Item + equippedItems[4]?.itemImgUrl} />
          </Profile>
          <Text
            margin="0 0 0 18px"
            color="#1D1B1B"
            size="18px"
            width="130px"
            bold
          >
            {nickname}
          </Text>
          <Text color="#FF8B37" size="18px" bold margin="0 0px 0 0px">
            {proofCnt}번
          </Text>
        </div>
      ) : (
        ""
      )}
    </RankingList>
  );
};

const RankingList = styled.div`
  width: 100%;
  height: 8.76vh;
  background-color: #ffff;
  display: grid;
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
    grid-template-columns: 17.4% 12.8% 1fr 13%;
    position: absolute;
    align-items: center;
  }
`;
const RankNum = styled.p`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #707070;
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
export default Ranking;
