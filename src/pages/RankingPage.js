import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";

import { ReactComponent as GoBack } from "../img/icon_left.svg";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as rankingActions } from "../redux/modules/ranking";
import Ranking from "../components/Ranking";
import MetaTag from "../shared/MetaTag";

import moment from "moment";

const RankingPage = () => {
  const dispatch = useDispatch();
  const Item = process.env.PUBLIC_URL + "/items/large";

  const tomorrow = moment().format("YYYY-MM-DD HH:mm");
  // console.log(tomorrow);

  React.useEffect(() => {
    dispatch(rankingActions.getRankingDB(100));
  }, []);

  // 내 랭킹데이터 가져오기
  const MyNickname = useSelector((state) => state.ranking.my_list?.nickname);
  const MyRank = useSelector((state) => state.ranking.my_list?.rank);
  const MyCnt = useSelector((state) => state.ranking.my_list?.proofCnt);

  const isEquip = useSelector((state) => state.ranking.my_list?.equippedItems);
  const equipColor = isEquip?.find((e) => e.category === "color");
  const equipBg = isEquip?.find((e) => e.category === "background");
  const equipClothes = isEquip?.find((e) => e.category === "clothes");
  const equipAcc = isEquip?.find((e) => e.category === "acc");
  const equipEmotion = isEquip?.find((e) => e.category === "emotion");

  // console.log("isEquip", test);

  //전체 랭킹데이터 가져오기
  const AllRanking = useSelector((state) => state.ranking.ranking_list);
  const AllisEquip = useSelector(
    (state) => state.ranking.ranking_list?.equippedItems
  );
  const AllequipColor = AllisEquip?.find((e) => e.category === "color");
  const AllequipBg = AllisEquip?.find((e) => e.category === "background");
  const AllequipClothes = AllisEquip?.find((e) => e.category === "clothes");
  const AllequipAcc = AllisEquip?.find((e) => e.category === "acc");
  const AllequipEmotion = AllisEquip?.find((e) => e.category === "emotion");

  console.log(
    "equip확인",
    // AllisEquip,
    AllRanking
    // AllequipBg?.itemImgUrl,
    // AllequipColor?.itemImgUrl,
    // AllequipClothes?.itemImgUrl,
    // AllequipAcc?.itemImgUrl
  );
  // console.log("아이템ㅌ확인", AllRanking[0]?.equippedItems[0]?.itemImgUrl);

  return (
    <Container>
      <MetaTag title="습관삼끼 | 인증랭킹" />
      <ContainerGrid>
        <Header>
          <GoBack
            style={{
              margin: "auto",
              fill: "#707070",
            }}
            onClick={() => {
              history.goBack();
            }}
          />
          <Text alignCenter size="22px" bold>
            습관삼끼 랭킹
          </Text>
        </Header>
      </ContainerGrid>
      <MyRanking>
        <div>
          <MyRankNum>{MyRank}</MyRankNum>

          <Profile>
            <ItemImg src={Item + equipBg?.itemImgUrl} />
            <ItemImg src={Item + equipColor?.itemImgUrl} />
            <ItemImg src={Item + equipClothes?.itemImgUrl} />
            <ItemImg src={Item + equipAcc?.itemImgUrl} />
            <ItemImg src={Item + equipEmotion?.itemImgUrl} />
          </Profile>
          <Text margin="0 0 0 18px" color="#fff" size="18px" width="130px" bold>
            {MyNickname}
          </Text>
          <Text
            alignCenter
            color="#fff"
            size="18px"
            width="100%"
            bold
            margin="0 0px 0 0px"
          >
            {MyCnt}번
          </Text>
        </div>
      </MyRanking>
      <ContainerGrid>
        <Text
          alignRight
          color="#707070"
          size="13px"
          margin="14px 20px 15px 0px"
        >
          최근 업데이트 : {tomorrow}
        </Text>
      </ContainerGrid>
      {/*랭킹순위 */}

      {/*1위*/}
      <RankingWrap>
        <div>
          <Medal src="images/icon_1st.png" alt="Icon_1st" />
          <AllProfile>
            <ItemImg src={Item + AllRanking[0]?.equippedItems[0]?.itemImgUrl} />
            <ItemImg src={Item + AllRanking[0]?.equippedItems[1]?.itemImgUrl} />
            <ItemImg src={Item + AllRanking[0]?.equippedItems[2]?.itemImgUrl} />
            <ItemImg src={Item + AllRanking[0]?.equippedItems[3]?.itemImgUrl} />
            <ItemImg src={Item + AllRanking[0]?.equippedItems[4]?.itemImgUrl} />
          </AllProfile>
        </div>
        <div>
          <Text margin="14px 0px 8px 0px" bold alignCenter>
            {AllRanking[0]?.nickname}
          </Text>
          <Text color="#ff8b37" bold margin="0px 0px 0px 0px" alignCenter>
            {AllRanking[0]?.proofCnt}번
          </Text>
        </div>
      </RankingWrap>

      <Wrap>
        {/*2위*/}
        <RankingWrap>
          <div>
            <Medal src="images/icon_2st.png" alt="Icon_2st" />
            <AllProfile>
              <ItemImg
                src={Item + AllRanking[1]?.equippedItems[0]?.itemImgUrl}
              />
              <ItemImg
                src={Item + AllRanking[1]?.equippedItems[1]?.itemImgUrl}
              />
              <ItemImg
                src={Item + AllRanking[1]?.equippedItems[2]?.itemImgUrl}
              />
              <ItemImg
                src={Item + AllRanking[1]?.equippedItems[3]?.itemImgUrl}
              />
              <ItemImg
                src={Item + AllRanking[1]?.equippedItems[4]?.itemImgUrl}
              />
            </AllProfile>
          </div>
          <div>
            <Text margin="14px 0px 8px 0px" bold alignCenter>
              {AllRanking[1]?.nickname}
            </Text>
            <Text color="#ff8b37" bold margin="0px 0px 0px 0px" alignCenter>
              {AllRanking[1]?.proofCnt}번
            </Text>
          </div>
        </RankingWrap>

        {/*3위*/}
        <RankingWrap>
          <div>
            <Medal src="images/icon_3st.png" alt="Icon_3st" />
            <AllProfile>
              <ItemImg
                src={Item + AllRanking[2]?.equippedItems[0]?.itemImgUrl}
              />
              <ItemImg
                src={Item + AllRanking[2]?.equippedItems[1]?.itemImgUrl}
              />
              <ItemImg
                src={Item + AllRanking[2]?.equippedItems[2]?.itemImgUrl}
              />
              <ItemImg
                src={Item + AllRanking[2]?.equippedItems[3]?.itemImgUrl}
              />
              <ItemImg
                src={Item + AllRanking[2]?.equippedItems[4]?.itemImgUrl}
              />
            </AllProfile>
          </div>

          <div>
            <Text margin="14px 0px 8px 0px" bold alignCenter>
              {AllRanking[2]?.nickname}
            </Text>
            <Text color="#ff8b37" bold margin="0px 0px 0px 0px" alignCenter>
              {AllRanking[2]?.proofCnt}번
            </Text>
          </div>
        </RankingWrap>
      </Wrap>
      <Line />

      {/*4위부터  */}
      <ListWrap>
        {AllRanking?.map((p, idx) => {
          if (idx > 2) return <Ranking key={p._id} {...p} />;
        })}
      </ListWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const MyRanking = styled.div`
  width: 100%;
  height: 8.76vh;
  background-color: #ff8b37;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

const MyRankNum = styled.p`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

const Profile = styled.div`
  border-radius: 5px;
  width: 50px;
  height: 50px;
  margin-right: 18px;
  position: relative;
`;

const AllProfile = styled.div`
  border-radius: 5px;
  width: 119px;
  height: 119px;
  margin-right: 18px;
  position: relative;
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  /* z-index: 1; */
  border-radius: 5px;
  object-fit: cover;
  margin-left: 4%;
`;

const Wrap = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-around;
`;

const RankingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  flex-direction: column;
  /* position: absolute; */
  left: 50%;

  & > div {
    position: relative;
    margin-left: 10px;
  }
`;

const ProfileImg = styled.img`
  width: 119px;
  height: 119px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Medal = styled.img`
  z-index: 99;
  position: absolute;
  left: -30.91px;
  top: -21px;
`;

const Line = styled.div`
  background-color: #f7f7f7;
  height: 5px;
  margin-top: 22px;
`;

const RankingList = styled.div`
  width: 100%;
  height: 8.76vh;
  background-color: #ffff;
  display: grid;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px #f7f7f7 solid;

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

const RankNum = styled.p`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #707070;
`;

const ListWrap = styled.div`
  display: grid;
`;
export default RankingPage;
