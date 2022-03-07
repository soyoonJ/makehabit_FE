// 내 챌린지 이름 바뀌면 파일명도 바꾸기
import React from "react";

import { Grid, Text, Input, Image } from "../elements";
import ButtonNavigation from "../components/ButtonNavigation";
import ConfirmPost from "../components/ConfirmPost";
import { actionCreators as challengeActions } from "../redux/modules/challenge";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const MyChallenge = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.challenge.page);
  // console.log("지금", currentPage);
  const challenge_list = useSelector((state) => state.challenge.challenge_list);
  const proof_list = useSelector((state) => state.challenge.proof_list);
  // console.log("갤러리", proof_list[0]);

  // 인증하기 페이지 클릭하면 리덕스에 이벤트 저장해놓고 true면 true, false면 false
  const [defaultTab, setTab] = React.useState(currentPage ? true : false);
  // const [clickedTab, changeTab] = React.useState(currentPage ? true : false);

  React.useEffect(() => {
    if (currentPage) {
      dispatch(challengeActions.naviChallengeDB());
    } else {
      dispatch(challengeActions.myChallengeDB());
    }
  }, []);
  console.log("MyChallenge", defaultTab);
  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>작심삼일 인증</div>
      <hr />

      <Container>
        <Grid
          pointer
          _onClick={() => {
            setTab(true);
          }}
          borderBottom={defaultTab ? "3px solid orange" : "null"}
        >
          내가 참여한 챌린지
        </Grid>

        <Grid
          pointer
          _onClick={() => {
            setTab(false);
          }}
          borderBottom={!defaultTab ? "3px solid orange" : "null"}
        >
          나의 기록보기
        </Grid>
      </Container>

      {defaultTab ? (
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
                src={proof_list.imgUrl}
                alt=""
                key={i}
                onClick={() => {
                  history.push(`/myfeed/${proof_list._id}`);
                }}
              />
            );
          })}
        </ImageContainer>
      )}
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
