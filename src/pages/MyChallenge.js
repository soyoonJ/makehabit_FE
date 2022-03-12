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
      <div style={{ textAlign: "center" }}>참여 챌린지</div>
      <hr />

      <Container>
        <Grid
          pointer
          _onClick={() => {
            history.push("/mychallenge/navi");
          }}
          borderBottom={currentPage === "navi" ? "3px solid orange" : "null"}
        >
          내가 참여한 챌린지
        </Grid>

        <Grid
          pointer
          _onClick={() => {
            history.push("/mychallenge/feed");
          }}
          borderBottom={currentPage === "feed" ? "3px solid orange" : "null"}
        >
          나의 기록보기
        </Grid>
      </Container>

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
                <Img
                  src={e.imgUrl}
                  alt=""
                  key={i}
                  onClick={() => {
                    history.push(`/myfeed/${e.proofShotId}`);
                  }}
                />
              );
            })}
          </ImageContainer>
        )}
      </ContainerGrid>
      <ButtonNavigation />
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 16px;
`;

const Img = styled.img`
  width: 90%;
  height: 90%;
  padding: 8px;
  cursor: pointer;
`;

export default MyChallenge;
