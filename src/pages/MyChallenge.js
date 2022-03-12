// 내 챌린지 이름 바뀌면 파일명도 바꾸기
import React from "react";

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
  console.log(challenge_list);
  const proof_list = useSelector((state) => state.challenge.proof_list);

  React.useEffect(() => {
    if (currentPage === "navi") {
      dispatch(challengeActions.naviChallengeDB());
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
            style={{ color: currentPage === "navi" ? "#1D1B1B" : "#707070" }}
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
            style={{ color: currentPage === "feed" ? "#1D1B1B" : "#707070" }}
          >
            나의 기록보기
          </TabName>
          {currentPage === "feed" ? <Highlight style={{ right: "0" }} /> : ""}
        </div>
      </Container>
      <hr style={{ margin: "0 0 2vh 0", outline: "none" }} />

      <ContainerGrid>
        {currentPage === "navi" ? (
          <div>
            {challenge_list?.map((e, i) => {
              return <ConfirmPost key={i} {...e} />;
            })}
          </div>
        ) : (
          <ImageContainer>
            {proof_list?.map((e, i) => {
              return (
                <div>
                  <Img
                    src={e.imgUrl}
                    alt=""
                    key={i}
                    onClick={() => {
                      history.push(`/myfeed/${e.proofShotId}`);
                    }}
                  />
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
  font-size: 20px;
  margin: 1.313em 0 4.7vh 0;
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
  bottom: 0;
  margin: 0px;
`;
const TabName = styled.div`
  cursor: pointer;
  margin-bottom: 0.875em;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9vh;
  justify-items: center;
  align-items: center;

  & > div {
    width: 100%;
    height: 100%;
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
