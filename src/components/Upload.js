import React, { forwardRef, useImperativeHandle } from "react";
// import { Text, Grid } from "../elements";
import styled from "styled-components";
import { useDispatch } from "react-redux";
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
  const [previewImg, setPreviewImg] = React.useState(
    location.pathname === "/postwrite"
      ? process.env.PUBLIC_URL + "/images/open_base.png"
      : process.env.PUBLIC_URL + "/images/confirm_base.png"
  );

  const saveFileImage = (e) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    dispatch(postActions.imgExist(true));
  };
  React.useEffect(() => {
    dispatch(postActions.imgExist(false));
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
        accept=".png , .jpg , .png, .jpeg, .gif, .jfif"
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

export default Upload;
