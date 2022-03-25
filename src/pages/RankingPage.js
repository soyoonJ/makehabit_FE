import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid } from "../elements";
import { history } from "../redux/configureStore";

import { ReactComponent as GoBack } from "../img/icon_left.svg";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as rankingActions } from "../redux/modules/ranking";

const RankingPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(rankingActions.getRankingDB(10));
    console.log("랭킹랭킹~~~~");
  }, []);

  return (
    <Container>
      <ContainerGrid>
        <Header>
          <GoBack
            style={{
              margin: "auto",
              fill: "#707070",
            }}
            onClick={() => {
              history.push("/");
            }}
          />
          <Text alignCenter size="22px" bold>
            습관삼끼 랭킹
          </Text>
        </Header>
      </ContainerGrid>

      <MyRanking>
        <div>
          <MyRankNum>004</MyRankNum>
          <Profile src="images/test.png" alt="testimg" />
          <Text margin="0 0 0 18px" color="#fff" size="18px" width="130px" bold>
            나의 닉네임입니다
          </Text>
          <Text color="#fff" size="18px" bold>
            100번
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
          2022.03.26 00시 업데이트
        </Text>
      </ContainerGrid>

      {/*랭킹순위 */}
      <RankingWrap>
        <div>
          <Medal src="images/icon_1st.png" alt="Icon_1st" />
          <ProfileImg src="images/test.png" />
        </div>
        <div>
          <Text margin="14px 0px 8px 0px" bold alignCenter>
            사용자닉네임임
          </Text>
          <Text color="#ff8b37" bold margin="0px 0px 0px 0px" alignCenter>
            100번
          </Text>
        </div>
      </RankingWrap>
      <Wrap>
        <RankingWrap>
          <div>
            <Medal src="images/icon_2st.png" alt="Icon_2st" />
            <ProfileImg src="images/test.png" />
          </div>

          <div>
            <Text margin="14px 0px 8px 0px" bold alignCenter>
              사용자닉네임임
            </Text>
            <Text color="#ff8b37" bold margin="0px 0px 0px 0px" alignCenter>
              100번
            </Text>
          </div>
        </RankingWrap>
        <RankingWrap>
          <div>
            <Medal src="images/icon_3st.png" alt="Icon_3st" />
            <ProfileImg src="images/test.png" />
          </div>
          <div>
            <Text margin="14px 0px 8px 0px" bold alignCenter>
              사용자닉네임임
            </Text>
            <Text color="#ff8b37" bold margin="0px 0px 0px 0px" alignCenter>
              100번
            </Text>
          </div>
        </RankingWrap>
      </Wrap>

      <Line />

      <RankingList>
        <div>
          <RankNum>004</RankNum>
          <Profile src="images/test.png" alt="testimg" />
          <Text
            margin="0 0 0 18px"
            color="#1D1B1B"
            size="18px"
            width="130px"
            bold
          >
            나의 닉네임입니다
          </Text>
          <Text color="#FF8B37" size="18px" bold>
            100번
          </Text>
        </div>
      </RankingList>
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

const Profile = styled.img`
  border-radius: 5px;
  width: 100%;
  height: 50px;
  margin-right: 18px;
`;

const Wrap = styled.div`
  display: flex;
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
  display: flex;
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

export default RankingPage;
