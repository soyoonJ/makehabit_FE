import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ContainerGrid, Text, Button } from "../elements";
import ButtonNavigation from "../components/ButtonNavigation";
import ConfirmPost from "../components/ConfirmPost";
import MetaTag from "../shared/MetaTag";

import { actionCreators as challengeActions } from "../redux/modules/challenge";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Dropdown } from "../img/icon_dropdown.svg";
import { ReactComponent as Dropup } from "../img/icon_dropup.svg";

import styled from "styled-components";

const MyChallenge = (props) => {
  const dispatch = useDispatch();
  const currentPage = props.match.params.id;
  const challenge_list = useSelector((state) => state.challenge.challenge_list);
  const isHostList = useSelector((state) =>
    state.challenge.challenge_list?.filter((e) => e.isHost === true)
  );
  const proof_list = useSelector((state) => state.challenge.proof_list);

  const [filter, setFilter] = useState(false);
  const [showMine, setShowMine] = useState(false);
  const [challengeText, setChallengeText] = useState("전체 챌린지 보기");

  const handleSelect = (e) => {
    setShowMine(e.target.value);
  };

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

      <ContainerGrid margin="0 0 14.6vh">
        {currentPage === "navi" ? (
          <div style={{ marginBottom: "14.6vh" }}>
            {filter ? (
              <MyChallengeBox
                onClick={() => {
                  setFilter(false);
                }}
              >
                <SelectBox>
                  <ToLeft>
                    <MyChallengeText>{challengeText}</MyChallengeText>
                  </ToLeft>
                  <ToRight>
                    <Dropup />
                  </ToRight>
                </SelectBox>
                {challengeText === "전체 챌린지 보기" ? (
                  <OptionBox>
                    {" "}
                    <MyChallengeText
                      onClick={() => {
                        setChallengeText("전체 챌린지 보기");
                        setShowMine(false);
                      }}
                      style={{ color: "#6825D6", fontWeight: "bold" }}
                    >
                      전체 챌린지 보기
                    </MyChallengeText>
                    <MyChallengeText
                      onClick={() => {
                        setChallengeText("내가 개설한 챌린지");
                        setShowMine(true);
                      }}
                    >
                      내가 개설한 챌린지
                    </MyChallengeText>
                  </OptionBox>
                ) : (
                  <OptionBox>
                    {" "}
                    <MyChallengeText
                      onClick={() => {
                        setChallengeText("전체 챌린지 보기");
                        setShowMine(false);
                      }}
                    >
                      전체 챌린지 보기
                    </MyChallengeText>
                    <MyChallengeText
                      onClick={() => {
                        setChallengeText("내가 개설한 챌린지");
                        setShowMine(true);
                      }}
                      style={{ color: "#6825D6", fontWeight: "bold" }}
                    >
                      내가 개설한 챌린지
                    </MyChallengeText>
                  </OptionBox>
                )}
              </MyChallengeBox>
            ) : (
              <MyChallengeBox
                onClick={() => {
                  setFilter(true);
                }}
              >
                <SelectBox>
                  <ToLeft>
                    <MyChallengeText>{challengeText}</MyChallengeText>
                  </ToLeft>
                  <ToRight>
                    <Dropdown />
                  </ToRight>
                </SelectBox>
              </MyChallengeBox>
            )}
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
            ) : showMine ? (
              <>
                {isHostList?.map((e, i) => {
                  return <ConfirmPost key={i} {...e} />;
                })}
              </>
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
              <ImageContainer style={{ marginTop: "14px" }}>
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

const MyChallengeBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: right;
  margin: 14px 0;
`;
const ToLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;
const ToRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;
const SelectBox = styled.div`
  padding: 0 14px 0 0;
  width: 134px;
  height: 40px;
  border-radius: 5px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MyChallengeText = styled.span`
  font-size: 13px;
  padding: 0 0 0 14px;
  color: #707070;
`;

const OptionBox = styled.div`
  position: absolute;
  top: 48px;
  width: 148px;
  height: 80px;
  border-radius: 5px;
  background-color: #f7f7f7;
  display: grid;
  grid-template-column: 1fr 1fr;
  align-items: center;
  // justify-content: center;
`;
export default MyChallenge;
