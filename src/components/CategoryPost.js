import React from "react";

import { Text } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// import { FcLikePlaceholder, FcLike } from "react-icons/fc";
// import { ContactSupportOutlined } from "@material-ui/icons";
const CategoryPost = (props) => {
  //좋아요 버튼 on/off
  // let [isLike, setIsLike] = React.useState(false);

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
      <Card
        onClick={() => {
          dispatch(postActions.getDetailPostDB(challengeId));
        }}
      >
        <ThumbnailBox>
          <Img src={thumbnail} />
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

        <Title>
          {title}
          {/* {titleLength > 10 ? puls : ""} */}
        </Title>
        {/* <Tag>
          <Text size="10px" alignCenter>
            {tags}
          </Text>
        </Tag> */}
      </Card>
    </React.Fragment>
  );
};

CategoryPost.defaultProps = {
  puls: "...",
  img: "ihttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaw8iLInSA0YTMGUXPAGcrG4ZvLC8PGrs8lZloBXFYYxI3DNCV7nVLmM83ojgAxMkQaA8&usqp=CAU",
  title:
    "타이틀 변수로 변경해라, 이거 길어지면 어떻게 나오닝?너 지금 뭐하고 있니?",
  tags: "작심삼일이다",
};

const Card = styled.div`
  /* margin: 10px 0px; */
  cursor: pointer;
  display: block;
  width: 100%;
`;

const ThumbnailBox = styled.div`
  width: 100%;
  height: 167px;
  position: relative;
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const Like = styled.img`
  size: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Tag = styled.div`
  display: inline-flex;
  background-color: beige;
  margin: 0% 3%;
  width: 90px;
  height: 20px;
  border-radius: 5px;
  align-items: center;
`;
const Title = styled.div`
  margin-top: 10px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
export default CategoryPost;
