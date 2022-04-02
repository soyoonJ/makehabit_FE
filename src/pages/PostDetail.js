import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { actionCreators as postActions } from "../redux/modules/post";

import { history } from "../redux/configureStore";

import LoginModal from "../components/LoginModal";
import { Text } from "../elements";
import PageBack from "../components/PageBack";
import LeaveModal from "../components/LeaveModal";
import MetaTag from "../shared/MetaTag";

import styled from "styled-components";

import moment from "moment";

import { BsFillPersonFill } from "react-icons/bs";
import { ReactComponent as ShareIcon } from "../img/icon_share.svg";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // console.log("pathname", location.pathname.split("/")[1]);
  const challenges = location.pathname.split("/")[1];

  const post = useSelector((state) => state.post.post);
  // const nickname = useSelector((state) => state.user.user.nickname);
  const challengeId = props.match.params.id;
  // console.log("POSTDETAIL", post, post?.isLike);
  // console.log("POSTEDETAIL:", post);
  //좋아요 버튼 on/off

  React.useEffect(() => {
    // dispatch(userActions.loginCheckDB());
    dispatch(postActions.getDetailPostDB(challengeId));
  }, []);

  console.log("나오나?", post);
  // React.useEffect(() => {
  //   console.log("좋아요가 바뀐다!");
  //   dispatch(postActions.getDetailPostDB(challengeId));
  // }, [post?.isLike]);
  // console.log("POSTDTAIL", post.startAt.subString(0, 10));
  // console.log(
  //   moment(post.startAt).utc().format("YYYY.MM.DD"),
  //   moment(post.startAt).day()
  // );
  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];

  //로그인 체크
  const is_login = useSelector((state) => state.user.is_login);

  //로그인모달창에 접근하는 ref
  const loginModal = React.useRef();
  //찜하기 (좋아요) 기능
  const like = () => {
    if (is_login) {
      dispatch(postActions.likeDB(challengeId));
    } else {
      loginModal.current.openModal();
    }
  };
  //찜하기 해제 기능
  const disLike = () => {
    if (is_login) {
      dispatch(postActions.dislikeDB(challengeId));
    } else {
      loginModal.current.openModal();
    }
  };
  //인증하기 기능
  const confirmPage = () => {
    if (is_login) {
      history.push(`/confirm/${challengeId}`);
    } else {
      loginModal.current.openModal();
    }
  };

  //인증하기 버튼 방어 코드
  const date = new Date(post?.startAt);
  const koStartAt = date.toLocaleString();
  const todayDate = new Date();
  const today = moment(todayDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  const setDay = moment(koStartAt, "YYYY-MM-DD").format("YYYY-MM-DD");

  // var duration = moment.duration(setDay.diff(today));
  // var days = duration.asDays();
  // console.log("koStartAt", koStartAt, today, setDay);
  // console.log(moment(setDay).diff(today, "days")); // 1
  const diffDay = moment(setDay).diff(today, "days");
  const spiltDate = koStartAt.split(". ");
  const stringDate = `${spiltDate[0]}년 ${spiltDate[1]}월 ${spiltDate[2]}일`;
  // console.log("아이디", challengeId);
  // 버튼 텍스트, 우측 상단 진행상태 텍스트 달기 위한 조건
  const statusText = [
    // { progress: "진행예정", buttonText: `${koStartAt.slice(0, 11)} 시작` },
    { progress: "진행예정", buttonText: `${stringDate} 시작` },
    { progress: "종료", buttonText: "종료된 챌린지" },
    { progress: "", buttonText: "오늘의 인증 성공! 내일도 만나요!" },
  ];

  let statusContent = "";
  //시작전
  if (post.status === 1) {
    statusContent = statusText[0];
  }
  //종료
  else if (post.status === 2) {
    statusContent = statusText[1];
  } else if (post.status === 0 && post.isUpload) {
    statusContent = statusText[2];
  }

  //몇 바퀴인지 표시
  const currentRound = parseInt((post?.proofCount - 1) / 3) + 1;
  // console.log("바퀴", currentRound, (currentRound - 1) * 3 + 2);
  const Item = process.env.PUBLIC_URL + "/images";

  //이미지경로
  const DisLikeImg =
    process.env.PUBLIC_URL + "/images/icon_outline_heart_shadow.png";
  const LikeImg = process.env.PUBLIC_URL + "/images/icon_fill_heart_shadow.png";

  //모달창

  const leaveModal = React.useRef();
  //Like 누를때마다 화면 전환
  const likeList = useSelector((state) => state.post.isLike);

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: `https://makehabit.co.kr/challenges/${challengeId}`,
      });
    } else {
      alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  };

  // 수정
  const EditpostId = props.match.params.id;

  React.useEffect(() => {
    dispatch(postActions.getDetailPostDB(challengeId));
  }, [likeList]);

  return (
    <Container>
      <MetaTag title={"습관삼끼 | " + post.title} />

      <TitleBox>
        <PageBack challenges={challenges} />
        <TitleImage src={post.thumbnail} />
      </TitleBox>

      <MarginBox>
        <TitleContainer>
          <TitleText>{post.title}</TitleText>
          <IconToRight>
            <ShareIcon
              onClick={sharePost}
              fill="#CFCFCF"
              style={{ margin: "0 14px" }}
            />

            {post.isLike ? (
              <Like
                src={LikeImg}
                onClick={() => {
                  disLike();
                }}
              />
            ) : (
              <Like
                src={DisLikeImg}
                onClick={() => {
                  like();
                }}
              />
            )}
          </IconToRight>
        </TitleContainer>
      </MarginBox>
      <MarginBox>
        <SubtitleContainer>
          {today < setDay ? (
            <Tag>{diffDay}일 뒤 시작</Tag>
          ) : (
            <Tag>습관삼끼 {post.round}세트</Tag>
          )}
          <JoinWrap>
            <BsFillPersonFill size={16} fill="#707070" />
            <JoinText>{post.participants}명과 함께 도전중이에요!</JoinText>
          </JoinWrap>
        </SubtitleContainer>
      </MarginBox>
      <BorderBox>
        <ChallengeStartContainer>
          <ToLeft>
            <ChallengeText>챌린지 시작일</ChallengeText>
          </ToLeft>
          <ToRight>
            <StartDate>
              {moment(koStartAt, "YYYY.MM.DD").format("YYYY년 MM월 DD일")}
            </StartDate>
          </ToRight>
        </ChallengeStartContainer>
        <MarginBox style={{ paddingTop: "23px", paddingBottom: "35px" }}>
          {/* 예상 종료일 */}
          <OrangeBox>
            <EndDateText>
              <ToLeft style={{ margin: "0.4rem", fontWeight: "600" }}>
                예상 종료일{" "}
              </ToLeft>
              <ToRight style={{ margin: "0.4rem", fontWeight: "600" }}>
                {moment(koStartAt, "YYYY.MM.DD")
                  .add(29, "days")
                  .format("YYYY년 MM월 DD일") +
                  " " +
                  dayArray[
                    moment(koStartAt, "YYYY.MM.DD").add(29, "days").day()
                  ] +
                  "요일"}
              </ToRight>
            </EndDateText>
          </OrangeBox>
          {/* <OrangeBox>
            <EndDateText>
              예상 종료일 :{" "}
              {moment(koStartAt, "YYYY.MM.DD")
                .add(30, "days")
                .format("YYYY년 MM월 DD일") +
                " " +
                dayArray[
                  moment(koStartAt, "YYYY.MM.DD").add(30, "days").day()
                ] +
                "요일"}
            </EndDateText>
          </OrangeBox> */}
        </MarginBox>
      </BorderBox>
      {post.isParticipate ? (
        <IsParticipate>
          <MarginBox style={{ marginTop: "1.688rem" }}>
            <HeadLine>나의 참여도</HeadLine>
            <Text size="1rem" margin="0.375rem 0 1rem 0">
              3번씩 10세트면 한 달 습관 성공! 꾸준히 도전해봐요!
            </Text>
          </MarginBox>
          <MarginBox style={{ marginBottom: "1.125rem" }}>
            <ColorBoxJoin>
              <CurrentRound>{currentRound}바퀴 진행중</CurrentRound>
            </ColorBoxJoin>
          </MarginBox>
          <JoinContainer>
            {post.proofCount >= (currentRound - 1) * 3 + 1 ? (
              <JoinBox style={{ backgroundColor: "orange" }}>
                <RoundText>{(currentRound - 1) * 3 + 1}번째</RoundText>
                <Img width="34px" src={Item + "/icon_coin.svg"} />
                <RoundPoint>인증 하면</RoundPoint>
                <RoundPoint>100P</RoundPoint>
              </JoinBox>
            ) : (
              <JoinBox>
                <RoundText>{(currentRound - 1) * 3 + 1}번째</RoundText>
                <Img width="34px" src={Item + "/icon_coin.svg"} />
                <RoundPoint>인증 하면</RoundPoint>
                <RoundPoint>100P</RoundPoint>
              </JoinBox>
            )}
            {post.proofCount >= (currentRound - 1) * 3 + 2 ? (
              <JoinBox style={{ backgroundColor: "orange" }}>
                <RoundText>{(currentRound - 1) * 3 + 2}번째</RoundText>
                <Img width="34px" src={Item + "/icon_coin.svg"} />
                <RoundPoint>인증 하면</RoundPoint>
                <RoundPoint>100P</RoundPoint>
              </JoinBox>
            ) : (
              <JoinBox>
                <RoundText>{(currentRound - 1) * 3 + 2}번째</RoundText>
                <Img width="34px" src={Item + "/icon_coin.svg"} />
                <RoundPoint>인증 하면</RoundPoint>
                <RoundPoint>100P</RoundPoint>
              </JoinBox>
            )}
            {post.proofCount >= (currentRound - 1) * 3 + 3 ? (
              <JoinBox style={{ backgroundColor: "orange" }}>
                <RoundText>{(currentRound - 1) * 3 + 3}번째</RoundText>
                <Img width="34px" src={Item + "/icon_coin.svg"} />
                <RoundPoint>인증 하면</RoundPoint>
                <RoundPoint>300P ~ 3000P</RoundPoint>
              </JoinBox>
            ) : (
              <JoinBox>
                <RoundText>{(currentRound - 1) * 3 + 3}번째</RoundText>
                <Img width="34px" src={Item + "/icon_coin.svg"} />
                <RoundPoint>인증 하면</RoundPoint>
                <RoundPoint>300P ~ 3000P</RoundPoint>
              </JoinBox>
            )}
          </JoinContainer>
          <TipBox>
            <TipContent style={{ color: "#FF8B37" }}>💡참여 꿀팁!! </TipContent>
            <TipContent>3일마다 300P~3000P 랜덤 증정!!</TipContent>
          </TipBox>
          <BorderBottomBox />
        </IsParticipate>
      ) : (
        ""
      )}

      <MarginBox style={{ paddingTop: "2.188rem" }}>
        <HeadLine>이런 챌린지에요!</HeadLine>
        <ColorBoxChallenge>
          <TextArea>{post.content}</TextArea>
        </ColorBoxChallenge>
      </MarginBox>
      {/* <PaddingBox /> */}
      <MarginBox style={{ paddingTop: "2.5rem" }}>
        <HeadLine>챌린지 인증방법</HeadLine>
        <ColorBoxChallenge>
          <TextArea>{post.howtoContent}</TextArea>
        </ColorBoxChallenge>
      </MarginBox>
      {post.isParticipate && post.status === 1 ? (
        <MarginBox>
          <CancelBox style={{ margin: "33px 0 100px 0" }}>
            <CancelButton onClick={() => leaveModal.current.openModal()}>
              챌린지 탈퇴하기
            </CancelButton>
          </CancelBox>
          <LeaveModal ref={leaveModal} challengeId={challengeId} />
        </MarginBox>
      ) : (
        <MarginBox style={{ margin: "0 0 100px 0" }}></MarginBox>
      )}

      <ConfirmContainer>
        {/* 참여 했을때 */}
        {post.isParticipate ? (
          post.status === 1 || post.status === 2 || post.isUpload ? (
            <ConfirmButton
              width="100%"
              bg="#ddd"
              fontSize="1rem"
              fontWeight="600"
              cursor="default"
            >
              {post.isChangeable ? (
                <HeadLine
                  onClick={() => {
                    history.push(`/editPostpage/${EditpostId}`);
                  }}
                >
                  챌린지 수정하기{" "}
                </HeadLine>
              ) : (
                <HeadLine>{statusContent.buttonText} </HeadLine>
              )}
              {/* <HeadLine>{statusContent.buttonText} </HeadLine>) */}
            </ConfirmButton>
          ) : (
            <ConfirmButton
              style={{ backgroundColor: "#FF8B37", color: "white" }}
              onClick={() => {
                confirmPage();
                // history.push(`/confirm/${props.challengeId}`);
              }}
            >
              <HeadLine>오늘의 인증하기</HeadLine>
            </ConfirmButton>
          ) // 참여 안했을 때 + 로그인 되어있을 때
        ) : is_login ? (
          <ConfirmBox>
            <JoinButton
              onClick={() => {
                if (is_login) {
                  dispatch(postActions.joinDB(challengeId));
                } else {
                  loginModal.current.openModal();
                }
              }}
            >
              <HeadLine>챌린지 참여하기</HeadLine>
            </JoinButton>
            {/* <Link
              to={{
                pathname: "/completed/participate",
                state: {
                  participateStart: post.startAt,
                  challengeId: challengeId,
                  title: post.title,
                },
              }}
            >
              <JoinButton
                onClick={() => {
                  dispatch(postActions.joinDB(challengeId));
                }}
              >
                <HeadLine>챌린지 참여하기</HeadLine>
              </JoinButton>
            </Link> */}
          </ConfirmBox>
        ) : (
          // 참여 안했을 때 + 로그인 안되어 있을 때
          <ConfirmBox>
            <JoinButton
              onClick={() => {
                loginModal.current.openModal();
              }}
            >
              <HeadLine>챌린지 참여하기</HeadLine>
            </JoinButton>
          </ConfirmBox>
        )}
      </ConfirmContainer>
      <LoginModal ref={loginModal} in_page />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  max-height: 100vh;
  // @media screen and (min-width: 420px) {
  //   max-height: 100vh;
  //   overflow: auto;
  // }
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TitleBox = styled.div`
  width: 100%;
  height: 15.625rem;
`;

const TitleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleContainer = styled.div`
  // text-align: center;
  margin: 1.563rem 0 0.875rem 0;
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
`;

const TitleText = styled.span`
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.813rem;
  word-break: break-all;
`;

const ToLeft = styled.div`
  display: flex;
  margin: 0 0 0 1.25rem;
  align-items: center;
  justify-content: left;
`;

const IconToRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const SubtitleContainer = styled.div`
  // text-align: center;
  // margin: 1.313em 0 4.7vh 0;
  display: flex;
  // align-items: center;
  // justify-content: center;
`;

const Tag = styled.div`
  font-size: 1rem;
  font-weight: 400;
  padding: 0.188rem 0.313rem;
  margin: 0 0.625rem 0 0;
  border-radius: 0.313rem;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #707070;
  text-align: center;
  @media (max-width: 420px) {
    font-size: 0.9rem;
  }
`;

const JoinWrap = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 4fr;
  align-items: center;
`;

const JoinText = styled.span`
  font-size: 1rem;
  line-height: 1.375rem;
  color: #707070;
  @media (max-width: 420px) {
    font-size: 0.9rem;
  }
`;
const ToRight = styled.div`
  display: flex;
  margin: 0 1.25rem;
  align-items: center;
  justify-content: right;
`;
const BorderBox = styled.div`
  margin-top: 20px;
  padding: 1.75rem 0 0;
  border-top: 0.094rem solid #e0e0e0;
  border-bottom: 0.094rem solid #e0e0e0;
`;

const IsParticipate = styled.div``;

const BorderBottomBox = styled.div`
  padding: 0.625rem 0;
  border-bottom: 0.094rem solid #e0e0e0;
`;

const PaddingBox = styled.div`
  padding: 10px 0;
`;

const ChallengeStartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.7fr;
`;
const ChallengeText = styled.span`
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.625rem;
  @media (max-width: 320px) {
    font-size: 1.1rem;
  }
`;
const StartDate = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.625rem;
  color: #ff8b37;
  @media (max-width: 320px) {
    font-size: 1.1rem;
  }
`;

const MarginBox = styled.div`
  margin: 0 1.25rem;
`;

const EndDateText = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  // justify-content: center;
  width: 100%;
  justify-content: space-between;
  color: white;

  @media (max-width: 420px) {
    // font-size: 0.8rem;
  }
`;

const OrangeBox = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: #ff8b37;
  border-radius: 0.313rem;
  display: flex;
  text-align: center;
`;
const CurrentRound = styled.span`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.375rem;
  color: #ff8b37;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const RoundText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.625rem;
  color: #707070;
`;
const RoundPoint = styled.span`
  font-size: 0.813rem;
  line-height: 1.063rem;
  color: #707070;
`;

const HeadLine = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.625rem;
`;

const TextArea = styled.span`
  font-size: 1.25rem;
  line-height: 1.625rem;
  white-space: pre-wrap;
`;

const ColorBoxJoin = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 40px;

  background-color: #fff1e7;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ColorBoxChallenge = styled.div`
  margin: 10px 0;
  box-sizing: border-box;
  display: flex;
  // justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  padding: 26px 33px;
  background: #fff1e7;
  // width: 100%;
  // height: 40px;
  // background-color: #fff1e7;
  // border-radius: 5px;
  // display: flex;
  // justify-content: center;
  // text-align: center;
`;

const JoinContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4%;
  margin: 0 20px;
`;

const JoinBox = styled.div`
  display: grid;
  grid-template-rows: 2fr 2fr 1fr 1fr;
  gap: 4%;
  height: 8rem;
  // margin: 5vh 0;
  padding: 0.5rem 0;
  border-radius: 10px;
  background-color: #f7f7f7;
  place-items: center;
  text-align: center;
`;

const ConfirmContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
  max-width: 420px;

  // background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  display: flex;
`;

const CancelBox = styled.div`
  margin: 10px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  // padding: 26px 33px;
  background: #ddd;
`;

const CancelButton = styled.button`
  width: 100%;
  font-size: 1.25rem;
  font-weight: 400;
  padding: 1.188rem 0;
  cursor: default;
  border: none;
  background-color: #f7f7f7;
  color: #707070;
`;
const ConfirmBox = styled.div`
  width: 100%;
  color: #fff;
  background-color: #ff8b37;
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ConfirmButton = styled.button`
  width: 100%;
  background-color: #ddd;
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: #707070;
  border: none;
`;

const JoinButton = styled.button`
  width: 100%;
  background-color: #ff8b37;
  font-size: 1rem;
  font-weight: 600;
  cursor: default;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: #fff;
  border: none;
`;

const Img = styled.img`
  size: 40px;
`;

const Like = styled.img`
  size: 10px;

  bottom: 10px;
  right: 10px;
`;

const TipBox = styled.div`
  margin: 1.25rem 0;
  padding: 0 1.25rem;
`;

const TipContent = styled.span`
  font-weight: 700;
`;
export default PostDetail;
