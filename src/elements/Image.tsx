import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    shape,
    src,
    size,
    padding,
    margin,
    _onClick,
    _onChange,
    height,
    width,
  } = props;

  const styles = {
    src: src,
    size: size,
    padding,
    margin,
    height,
    width,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter onClick={_onClick} onChange={_onChange}>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  if (shape === "ConfirmHistory") {
    return (
      <HistoryImage onClick={_onClick}>
        <AspectInner {...styles}></AspectInner>
      </HistoryImage>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "circle",
  src: "https://i.insider.com/4f3433986bb3f7b67a00003c?width=600&format=jpeg&auto=webp",
  size: "60",
  padding: "0 20px",
  margin: "0",
  _onClick: () => {},
  _onChange: () => {},
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const HistoryImage = styled.div`
  min-width: 250px;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
  ${(props) => (props.height ? `height:${props.height};` : "")};
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  ${(props) => (props.width ? `width:${props.width};` : "")};
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;

  ${(props) => (props.padding ? `margin:${props.padding};` : "")};
  ${(props) => (props.src ? `src:${props.src};` : "")};
`;

export default Image;
