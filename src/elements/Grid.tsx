import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    maxWidth,
    padding,
    margin,
    bg,
    children,
    _onClick,
    height,
    lineHeight,
    borderBottom,
    borderTop,
    is_flex_start,
    borderRadius,
    position,
    top,
    left,
    justifyContent,

    is_post_box,
    is_category_box,

    boxSizing,
    borderStyle,
    alignItems,
    flexWrap,
    textAlign,
    letterSpacing,
    pointer,

    fontSize,
    fontWeight,
  } = props;

  const styles = {
    is_flex,
    width,
    maxWidth,
    height,
    lineHeight,
    padding,
    margin,
    bg,
    borderBottom,
    borderTop,
    borderRadius,
    position,
    left,
    top,
    justifyContent,
    is_post_box,
    is_category_box,
    boxSizing,
    borderStyle,
    alignItems,
    flexWrap,
    textAlign,
    letterSpacing,
    pointer,
    fontSize,
    fontWeight,
  };

  if (is_post_box) {
    return (
      <PostGridBox {...styles} onClick={_onClick}>
        {children}
      </PostGridBox>
    );
  }
  if (is_category_box) {
    return (
      <CategoryBox {...styles} onClick={_onClick}>
        {children}
      </CategoryBox>
    );
  }
  return (
    <>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  maxWidth: "",
  height: "100%",
  lineHeight: "",
  padding: false,
  margin: false,
  bg: false,
  borderBottom: false,
  borderTop: false,
  borderRadius: false,
  position: false,
  justifyContent: "space-between",
  flexWrap: null,
  pointer: "",
  letterSpacing: "",
};

const GridBox = styled.div`
  box-sizing: border-box;
  ${(props) => ((props as any).pointer ? `cursor: pointer;` : "")}

  width: ${(props) => (props as any).width};
  ${(props) =>
    (props as any).maxWidth ? `max-width: ${(props as any).maxWidth};` : ""}
  height: ${(props) => (props as any).height};
  ${(props) =>
    (props as any).lineHeight
      ? `line-height: ${(props as any).lineHeight};`
      : ""}
  ${(props) =>
    (props as any).padding ? `padding: ${(props as any).padding};` : ""}
  ${(props) =>
    (props as any).margin ? `margin: ${(props as any).margin};` : ""}
  ${(props) =>
    (props as any).bg ? `background-color: ${(props as any).bg};` : ""}
  ${(props) =>
    (props as any).is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
  ${(props) =>
    (props as any).borderBottom
      ? `border-bottom: ${(props as any).borderBottom};`
      : ""}
    ${(props) =>
    (props as any).borderTop ? `border-top: ${(props as any).borderTop};` : ""}
  // ${(props) =>
    (props as any).justifyCenter ? `justify-content: center` : ""}
  // ${(props) => ((props as any).justifyRight ? `justify-content: right` : "")}
  ${(props) => ((props as any).borderRadius ? `border-radius: 10px` : "")}
  ${(props) => ((props as any).left ? `left: ${(props as any).left}` : "")}
  ${(props) => ((props as any).top ? `top: ${(props as any).top}` : "")}
  position: ${(props) => (props as any).position};
  justify-content: ${(props) => (props as any).justifyContent};
  boxsizing: ${(props) => (props as any).boxSizing};
  border-style: ${(props) => (props as any).borderStyle};
  align-items: ${(props) => (props as any).alignItems};
  text-align: ${(props) => (props as any).textAlign};
  ${(props) =>
    (props as any).letterSpacing
      ? `letter-spacing: ${(props as any).letterSpacing};`
      : ""}
  ${(props) =>
    (props as any).borderTop ? `border-top: ${(props as any).borderTop};` : ""}
  ${(props) =>
    (props as any).borderBottom
      ? `border-bottom: ${(props as any).borderBottom};`
      : ""}
  ${(props) =>
    (props as any).fontSize ? `font-size: ${(props as any).fontSize};` : ""}
  ${(props) =>
    (props as any).fontWeight
      ? `font-weight: ${(props as any).fontWeight};`
      : ""}
`;

const PostGridBox = styled.div`
  width: ${(props) => (props as any).width};
  height: ${(props) => (props as any).height};
  ${(props) =>
    (props as any).padding ? `padding: ${(props as any).padding};` : ""}
  ${(props) =>
    (props as any).margin ? `margin: ${(props as any).margin};` : ""}
  ${(props) =>
    (props as any).bg ? `background-color: ${(props as any).bg};` : ""}
  ${(props) =>
    (props as any).is_flex ? `display: flex; align-items: center; ` : ""}
  ${(props) =>
    (props as any).flexWrap ? `flex-wrap: ${(props as any).flexWrap};` : ""}
`;

const CategoryBox = styled.div`
  width: ${(props) => (props as any).width};
  height: ${(props) => (props as any).height};
  ${(props) =>
    (props as any).padding ? `padding: ${(props as any).padding};` : ""}
  ${(props) =>
    (props as any).margin ? `margin: ${(props as any).margin};` : ""}
  ${(props) =>
    (props as any).bg ? `background-color: ${(props as any).bg};` : ""}
  ${(props) =>
    (props as any).is_flex
      ? `display: flex; align-items: center; justify-content: center; `
      : ""}
  ${(props) =>
    (props as any).borderTop ? `border-top: ${(props as any).borderTop};` : ""}
  ${(props) =>
    (props as any).borderBottom
      ? `border-bottom: ${(props as any).borderBottom};`
      : ""}
`;

export default Grid;
