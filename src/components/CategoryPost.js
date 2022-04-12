import React from "react";

import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

import LoginModal from "../components/LoginModal";

import moment from "moment";

const CategoryPost = (props) => {
  function getParametersForUnsplash({ width, height, quality, format }) {
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
  }

  const dispatch = useDispatch();

  const loginModal = React.useRef();
  const {
    thumbnail,
    title,
    challengeId,
    startAt,

    isLike,
    participants,
  } = props;

  const DisLikeImg =
    process.env.PUBLIC_URL + "/images/icon_outline_heart_shadow.png";
  const LikeImg = process.env.PUBLIC_URL + "/images/icon_fill_heart_shadow.png";
  const Icon = process.env.PUBLIC_URL + "/images";

  const is_login = useSelector((state) => state.user.is_login);

  const like = () => {
    if (is_login) {
      dispatch(postActions.likeDB(challengeId));
    } else {
      loginModal.current.openModal();
    }
  };
  const disLike = () => {
    if (is_login) {
      dispatch(postActions.dislikeDB(challengeId));
    } else {
      loginModal.current.openModal();
    }
  };

  const date = new Date(startAt);
  const koStartAt = date.toLocaleString();
  const todayDate = new Date();
  const today = moment(todayDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  const setDay = moment(koStartAt, "YYYY-MM-DD").format("YYYY-MM-DD");
  const diffDay = moment(setDay).diff(today, "days");

  return (
    <React.Fragment>
      <Card>
        <ThumbnailBox>
          <Img
            alt="썸네일"
            src={
              // 이미지 경량화 작업
              thumbnail +
              getParametersForUnsplash({
                width: 334,
                height: 334,
                quality: 80,
                format: "jpg",
              })
            }
            onClick={() => {
              history.push(`/challenges/${challengeId}`);
            }}
          />
          {isLike ? (
            <Like
              src={LikeImg}
              alt="좋아요 아이콘"
              onClick={() => {
                disLike();
              }}
            />
          ) : (
            <Like
              src={DisLikeImg}
              alt="좋아요취소 아이콘"
              onClick={() => {
                like();
              }}
            />
          )}
        </ThumbnailBox>

        <Title>{title}</Title>
        <TagWrap>
          {today < setDay ? (
            <Tag>{diffDay}일 뒤 시작</Tag>
          ) : (
            <Tag>오늘부터시작!</Tag>
          )}

          <ParticipantsTag>
            <img src={Icon + "/icon_mypage.svg"} alt="icon" />
            {participants}명
          </ParticipantsTag>
        </TagWrap>
      </Card>
      <LoginModal ref={loginModal} in_page />
    </React.Fragment>
  );
};

CategoryPost.defaultProps = {
  puls: "...",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaw8iLInSA0YTMGUXPAGcrG4ZvLC8PGrs8lZloBXFYYxI3DNCV7nVLmM83ojgAxMkQaA8&usqp=CAU",
  title: "",
  tags: "",
};

const Card = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
  width: 100%;
`;

const ThumbnailBox = styled.div`
  width: 100%;
  height: 167px;
  position: relative;
  border-radius: 5px;
  z-index: 9;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  position: relative;
  z-index: 9;
`;

const Like = styled.img`
  size: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 90;
`;

const Title = styled.div`
  margin-top: 10px;
  word-break: break-all;
  font-size: 18px;
  font-weight: bold;
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const TagWrap = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
    width: 40%;
    align-items: center;
  }
`;

const Tag = styled.div`
  width: 100%;
  min-width: 95px;
  font-size: 15px;
  font-weight: 500;
  /* height: 100%; */
  background-color: #efefef;
  border-radius: 5px;
  padding: 3%;
  text-align: center;
  justify-content: center;
  margin-right: 5px;
  color: #707070;
`;

const ParticipantsTag = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  height: 100%;
  display: flex;
  text-align: center;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  color: #707070;
`;
export default CategoryPost;
