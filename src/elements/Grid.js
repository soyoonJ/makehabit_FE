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
  padding: false,
  margin: false,
  bg: false,
  borderBottom: false,
  borderTop: false,
  // justifyCenter: false,
  // justifyRight: false,
  borderRadius: false,
  position: false,
  justifyContent: "space-between",
  flexWrap: null,
  pointer: "",
  letterSpacing: "",
};

const GridBox = styled.div`
  box-sizing: border-box;
  ${(props) => (props.pointer ? `cursor: pointer;` : "")}

  width: ${(props) => props.width};
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : "")}
  height: ${(props) => props.height};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
  ${(props) =>
    props.borderBottom ? `border-bottom: ${props.borderBottom};` : ""}
    ${(props) => (props.borderTop ? `border-top: ${props.borderTop};` : "")}
  // ${(props) => (props.justifyCenter ? `justify-content: center` : "")}
  // ${(props) => (props.justifyRight ? `justify-content: right` : "")}
  ${(props) => (props.borderRadius ? `border-radius: 10px` : "")}
  ${(props) => (props.left ? `left: ${props.left}` : "")}
  ${(props) => (props.top ? `top: ${props.top}` : "")}
  position: ${(props) => props.position};
  justify-content: ${(props) => props.justifyContent};
  boxsizing: ${(props) => props.boxSizing};
  border-style: ${(props) => props.borderStyle};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};
  ${(props) =>
    props.letterSpacing ? `letter-spacing: ${props.letterSpacing};` : ""}
  ${(props) => (props.borderTop ? `border-top: ${props.borderTop};` : "")}
  ${(props) =>
    props.borderBottom ? `border-bottom: ${props.borderBottom};` : ""}
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : "")}
  ${(props) => (props.fontWeight ? `font-weight: ${props.fontWeight};` : "")}
`;

const PostGridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex ? `display: flex; align-items: center; ` : "")}
  ${(props) => (props.flexWrap ? `flex-wrap: ${props.flexWrap};` : "")}
`;

const CategoryBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: center; `
      : ""}
  ${(props) => (props.borderTop ? `border-top: ${props.borderTop};` : "")}
  ${(props) =>
    props.borderBottom ? `border-bottom: ${props.borderBottom};` : ""}
`;

export default Grid;
