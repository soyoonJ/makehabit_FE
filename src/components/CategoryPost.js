import React from "react";

import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// import { FcLikePlaceholder, FcLike } from "react-icons/fc";
// import { ContactSupportOutlined } from "@material-ui/icons";
const CategoryPost = (props) => {
  //좋아요 버튼 on/off
  // let [isLike, setIsLike] = React.useState(false);
  function getParametersForUnsplash({ width, height, quality, format }) {
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
  }

  const dispatch = useDispatch();
  // const post = useSelector((state) => state.main.category_list);
  // console.log("정신차려라", post);

  // const Img01 = process.env.PUBLIC_URL + "/images";
  // "이미지","타이틀이 들어가나용" > 밑에 변수값으로 나중에 변경
  const { thumbnail, title, tags, challengeId, puls, isLike } = props;
  // console.log("카테고리포스트", props);

  //글자수체크
  // let titleLength = title.length;
  // let subtitle = title.substring(0, 7);
  // console.log(subtitle);

  //이미지경로
  const DisLikeImg =
    process.env.PUBLIC_URL + "/images/icon_outline_heart_shadow.png";
  const LikeImg = process.env.PUBLIC_URL + "/images/icon_fill_heart_shadow.png";

  //로그인 체크
  const is_login = useSelector((state) => state.user.is_login);
  //찜하기 (좋아요) 기능
  const like = () => {
    if (is_login) {
      dispatch(postActions.likeDB(challengeId));
    } else {
      window.alert("로그인 후 인증 해주세요!");
      history.push("/login");
    }
  };
  //찜하기 해제 기능
  const disLike = () => {
    if (is_login) {
      dispatch(postActions.dislikeDB(challengeId));
    } else {
      window.alert("로그인 후 인증 해주세요!");
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      {/* 클릭 시 이동 일단 임의로 설정 */}
      <Card>
        <ThumbnailBox>
          <Img
            // 기존 이미지 크기 두배로 리사이징
            src={
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
        </ThumbnailBox>

        <Title>{title}</Title>

        {/* <Tag>
            {tags}
          </Text>
        </Tag> */}
      </Card>
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

// const Tag = styled.div`
//   display: inline-flex;
//   background-color: beige;
//   margin: 0% 3%;
//   width: 90px;
//   height: 20px;
//   border-radius: 5px;
//   align-items: center;
// `;
const Title = styled.div`
  margin-top: 10px;
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
export default CategoryPost;
