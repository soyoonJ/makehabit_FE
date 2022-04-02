import React, { forwardRef, useImperativeHandle } from "react";
// import { Text, Grid } from "../elements";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { actionCreators as postActions } from "../redux/modules/post";

const Upload = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // console.log("현재위치", location.pathname);
  const { _onClick, _ref } = props;
  // console.log("upload", ref, props, _ref);
  useImperativeHandle(ref, () => ({
    //div창 클릭시 이미지 인풋 클릭
    upload() {
      let myInput = document.getElementById("thumnail");
      myInput.click();
    },
  }));

  // console.log("페이지링크", props.match.params);

  //이미지 업로드
  // const [previewImg, setPreviewImg] = React.useState(
  //   location.pathname === "/postwrite"
  //     ? process.env.PUBLIC_URL + "/images/open_base.png"
  //     : process.env.PUBLIC_URL + "/images/confirm_base.png"
  // );

  const saveFileImage = (e) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    dispatch(postActions.imgExist(true));
  };

  //이미지수정
  // const EditpostId = props.match.params.id;
  const editthumbnail = useSelector((state) => state.post.post.thumbnail);
  console.log("이미지지", editthumbnail);

  //이미지 업로드
  const [previewImg, setPreviewImg] = React.useState(
    location.pathname.includes("/editPostpage")
      ? // location.pathname === "/postwrite"
        // process.env.PUBLIC_URL + "/images/open_base.png"
        editthumbnail
      : location.pathname.includes("/confirm")
      ? process.env.PUBLIC_URL + "/images/confirm_base.png"
      : // : { editthumbnail }
        process.env.PUBLIC_URL + "/images/open_base.png"
  );

  React.useEffect(() => {
    dispatch(postActions.imgExist(false));
    // dispatch(postActions.imageUpload());
  }, []);

  return (
    <ImageBox
      style={{
        backgroundImage: `url(${previewImg})`,
      }}
      onClick={_onClick}
    >
      <ImageInput
        id="thumnail"
        type="file"
        accept=".png, .jpg, .jpeg, .gif, .jfif, .webp, image/*;capture=camera"
        // accept="capture=camera"
        onChange={saveFileImage}
        ref={_ref}
        cursor="pointer"
        // width="100%"
        // height="100%"
      ></ImageInput>
    </ImageBox>
  );
});

Upload.defaultProps = {};

const ImageBox = styled.div`
  display: flex;
  margin: auto;
  height: 12rem;
  width: 100%;

  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-size: 100% 100%;
`;

const ImageInput = styled.input`
  display: none;
  // ::file-selector-button {
  //   display: none;
  // }
`;

const Imagethumbmail = styled.img`
  display: flex;
  margin: auto;
  height: 12rem;
  width: 100%;

  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-size: 100% 100%;
`;

export default Upload;
