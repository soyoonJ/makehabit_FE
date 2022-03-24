// 내 챌린지 이름 바뀌면 파일명도 바꾸기
import React from "react";
import { Link } from "react-router-dom";

import { ContainerGrid, Text, Button } from "../elements";
import ButtonNavigation from "../components/ButtonNavigation";
import ConfirmPost from "../components/ConfirmPost";
import MetaTag from "../shared/MetaTag";
import Spinner from "../shared/Spinner";

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
  const isLoading = useSelector((state) => state.challenge.isLoading);

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
      <MetaTag title="습관삼끼 | 참여 챌린지 목록" />
      {isLoading ? <Spinner /> : ""}

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
          margin: "0 0 2.84vh 0",
          outline: "none",
          border: "none",
          background: "#E0E0E0",
        }}
      />

      {/* 참여챌린지 */}
      <ContainerGrid margin="0 0 14.6vh">
        {currentPage === "navi" ? (
          <div style={{ marginBottom: "14.6vh" }}>
            {challenge_list?.length === 0 ? (
              <NoChallenge>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/illust_question2_samkki.png"
                    }
                    alt="상단 캐릭터 일러스트"
                    style={{ height: "26.77vh", margin: "36px 0px 0px 0px" }}
                  />
                </div>
                <Text size="24px" bold margin="0px 0px 5px 0px">
                  참여중인 챌린지가 없어요!
                </Text>
                <Text size="20px" margin="18px 0px 5px 0px">
                  지금 바로 챌린지에 참여하셔서
                </Text>
                <Text size="20px" margin="0px 0px 0px 0px">
                  습관만들기를 시작해보세요!
                </Text>
                <br />
                <Button
                  bg="#FF8B37"
                  margin="44px 0px 0px 0px"
                  height="67px"
                  _onClick={() => {
                    history.push("/postwrite");
                  }}
                  fontSize="22px"
                >
                  습관만들러 가기
                </Button>
              </NoChallenge>
            ) : (
              <>
                {challenge_list?.map((e, i) => {
                  return <ConfirmPost key={i} {...e} />;
                })}
              </>
            )}
          </div>
        ) : (
          <>
            {proof_list?.length === 0 ? (
              <NoChallenge>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/illust_question2_samkki.png"
                    }
                    alt="상단 캐릭터 일러스트"
                    style={{ height: "26.77vh", margin: "36px 0px 0px 0px" }}
                  />
                </div>
                <Text size="24px" bold margin="0px 0px 5px 0px">
                  참여중인 챌린지가 없어요!
                </Text>
                <Text size="20px" margin="18px 0px 5px 0px">
                  지금 바로 챌린지에 참여하셔서
                </Text>
                <Text size="20px" margin="0px 0px 0px 0px">
                  습관만들기를 시작해보세요!
                </Text>
                <br />
                <Button
                  bg="#FF8B37"
                  margin="44px 0px 0px 0px"
                  height="67px"
                  _onClick={() => {
                    history.push("/postwrite");
                  }}
                  fontSize="22px"
                >
                  습관만들러 가기
                </Button>
              </NoChallenge>
            ) : (
              <ImageContainer>
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
          </>
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

// 챌린지 없을 때 띄워줌
const NoChallenge = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
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
