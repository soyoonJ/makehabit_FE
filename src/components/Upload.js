import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Text, Grid } from "../elements";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

const Upload = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { _onClick, _ref } = props;
  // console.log("upload", ref, props, _ref);
  useImperativeHandle(ref, () => ({
    //div창 클릭시 이미지 인풋 클릭
    upload() {
      let myInput = document.getElementById("thumnail");
      myInput.click();
    },
  }));

  //이미지 업로드
  const [previewImg, setPreviewImg] = React.useState(
    "https://user-images.githubusercontent.com/82128525/154899930-6333a730-9e2c-4123-a3b7-760d9e61b43f.png"
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
        accept=".png , .jpg , .png, .jpeg, .gif"
        onChange={saveFileImage}
        ref={_ref}
        cursor="pointer"
      ></ImageInput>
    </ImageBox>
  );
});

Upload.defaultProps = {};

const ImageBox = styled.div`
  display: flex;
  margin: auto;
  height: 21vh;
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
  // width: 100%;
  // height: 100%;
`;

export default Upload;
