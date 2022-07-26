import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid, Button } from "../elements";
import MetaTag from "../shared/MetaTag";

import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { ReactComponent as GoBack } from "../img/icon_left.svg";

const LikeCollection = (props) => {
  const dispatch = useDispatch();
  const like_list = useSelector((state) => state.post.likeCollection);

  const categoryId = props.match.params.id;

  React.useEffect(() => {
    dispatch(postActions.getLikeDB(categoryId));
  }, []);

  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 좋아요 모아보기" />

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
            좋아요 모아보기
          </Text>
        </Header>
      </ContainerGrid>

      <ContainerGrid margin="0 0 14.6vh">
        {like_list?.length === 0 ? (
          <NoChallenge>
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "/images/illust_question_samkki.png"
                }
                alt="상단 캐릭터 일러스트"
                style={{ height: "26.77vh" }}
              />
            </div>
            <Text size="24px" bold margin="0px 0px 5px 0px">
              찾으시는 챌린지가 없어요!
            </Text>
            <Text size="20px" margin="0px 0px 5px 0px">
              새로운 챌린지를 개설하셔서
            </Text>
            <Text size="20px" margin="0px 0px 5px 0px">
              습관을 만들어 볼까요?
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
          <div>
            <CardWrap>
              {like_list?.map((p, idx) => {
                return <CategoryPost key={p._id} {...p} />;
              })}
            </CardWrap>
          </div>
        )}
      </ContainerGrid>
      <ButtonNavigation />
    </React.Fragment>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const CardWrap = styled.div`
  margin-top: 2.6vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  align-items: baseline;
`;

const NoChallenge = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 60px;
`;

export default LikeCollection;
