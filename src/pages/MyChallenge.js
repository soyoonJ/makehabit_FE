// 내 챌린지 이름 바뀌면 파일명도 바꾸기
import React from "react";
import { Link } from "react-router-dom";

import { ContainerGrid, Grid, Text, Input, Image } from "../elements";
import ButtonNavigation from "../components/ButtonNavigation";
import ConfirmPost from "../components/ConfirmPost";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const MyChallenge = (props) => {
  const dispatch = useDispatch();
  const currentPage = props.match.params.id;
  // console.log("지금", currentPage);
  const challenge_list = useSelector((state) => state.challenge.challenge_list);
  const proof_list = useSelector((state) => state.challenge.proof_list);
  // console.log("챌린지리스트", challenge_list);
  // console.log("피드길이", proof_list?.length);

  React.useEffect(() => {
    if (currentPage === "navi") {
      dispatch(challengeActions.naviChallengeDB());
      dispatch(challengeActions.myChallengeDB());
    } else {
      dispatch(challengeActions.myChallengeDB());
    }
  }, [currentPage]);

  return (
    <React.Fragment>
      <PageTitle style={{ textAlign: "center" }}>참여 챌린지</PageTitle>

      <Container>
        <div>
          <TabName
            onClick={() => {
              history.push("/mychallenge/navi");
            }}
            style={{
              color: currentPage === "navi" ? "#1D1B1B" : "#707070",
              fontWeight: currentPage === "navi" ? "600" : "400",
            }}
          >
            내가 참여한 챌린지
          </TabName>
          {currentPage === "navi" ? <Highlight style={{ left: "0" }} /> : ""}
        </div>

        <div>
          <TabName
            onClick={() => {
              history.push("/mychallenge/feed");
            }}
            style={{
              color: currentPage === "feed" ? "#1D1B1B" : "#707070",
              fontWeight: currentPage === "feed" ? "600" : "400",
            }}
          >
            나의 기록보기
          </TabName>
          {currentPage === "feed" ? <Highlight style={{ right: "0" }} /> : ""}
        </div>
      </Container>
      <hr
        style={{
          height: "0.094rem",
          margin: "0 0 2vh 0",
          outline: "none",
          border: "none",
          background: "#E0E0E0",
        }}
      />

      {/* 참여챌린지 */}
      <ContainerGrid margin="0 0 14.6vh">
        {currentPage === "navi" ? (
          <div style={{ marginBottom: "14.6vh" }}>
            {challenge_list?.map((e, i) => {
              return <ConfirmPost key={i} {...e} />;
            })}
          </div>
        ) : (
          <ImageContainer>
            {/* 나의 기록보기 페이지 */}
            {proof_list?.map((e, i) => {
              return (
                <div>
                  <Link
                    to={{
                      pathname: `/myfeed/${e.proofShotId}`,
                      state: { length: proof_list?.length, order: i },
                    }}
                  >
                    <Img src={e.imgUrl} alt="" key={i} />
                  </Link>
                </div>
              );
            })}
          </ImageContainer>
        )}
      </ContainerGrid>
      <ButtonNavigation />
    </React.Fragment>
  );
};

const PageTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 2.6vh;
  margin: 2.49vh 0 4.7vh 0;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  position: relative;
`;

const Highlight = styled.hr`
  position: absolute;
  height: 3px;
  width: 50%;
  border: none;
  border-radius: 20px;
  background-color: #ff8b37;
  z-index: 10;
  bottom: -0.094rem;
  margin: 0px;
`;
const TabName = styled.div`
  cursor: pointer;
  margin-bottom: 2.37vh;
  font-size: 1.9vh;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  align-items: center;

  & > div {
    width: 100%;
    height: 19.7vh;
    min-height: 165px;
    border-radius: 5.5px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5.5px;
`;

export default MyChallenge;
