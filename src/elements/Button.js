import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    margin,
    height,
    lineHeight,
    width,
    maxWidth,
    padding,
    disable,
    bg,
    color,
    cursor,
    border,
    borderRadius,
    position,
    bottom,
    right,
    left,
    fontSize,
    fontWeight,
    alignItems,
    display,
    is_float,
    centerFlex,
    alignSelf,
    disabled,
    zIndex,
    alignLeft,
    borderbottom,
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton disabled={disabled} onClick={_onClick}>
          {text ? text : children}
        </FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin,
    padding,
    height,
    lineHeight,
    width,
    maxWidth,
    color,
    bg,
    cursor,
    border,
    borderRadius,
    position,
    bottom,
    right,
    left,
    fontSize,
    alignItems,
    alignSelf,
    centerFlex,
    display,
    fontWeight,
    zIndex,

    alignLeft,
    borderbottom,
  };

  return (
    <>
      <ElButton {...styles} onClick={_onClick} disabled={disable}>
        {text ? text : children}
      </ElButton>
    </>
  );
};

Button.defaultProps = {
  text: false,
  _onClick: () => {},
  children: null,
  margin: false,
  padding: "12px 0px",
  disable: false,
  color: "#fff",
  height: "",
  width: "100%",
  maxWidth: "",
  cursor: "pointer",
  bg: "#000000",
  border: "none",
  borderRadius: "5px",
  position: false,
  fontSize: null,
  fontWeight: null,
  right: null,
  centerFlex: null,
  alignLeft: false,
  borderbottom: false,
};

const ElButton = styled.button`
  box-sizing: border-box;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  ${(props) => (props.height ? `height:${props.height};` : "")};
  ${(props) => (props.lineHeight ? `line-height:${props.lineHeight};` : "")};
  ${(props) => (props.width ? `width:${props.width};` : "")};
  ${(props) => (props.maxWidth ? `max-width:${props.maxWidth};` : "")};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
  cursor: ${(props) => props.cursor};
  position: ${(props) => props.position};
  ${(props) => (props.bottom ? `bottom:${props.bottom};` : "")};
  ${(props) => (props.right ? `right:${props.right};` : "")};
  ${(props) => (props.left ? `left:${props.left};` : "")};
  ${(props) => (props.fontSize ? `font-size:${props.fontSize};` : "")};
  ${(props) => (props.fontWeight ? `font-weight:${props.fontWeight};` : "")};
  align-items: ${(props) => props.alignItems};
  ${(props) => (props.alignSelf ? `align-self: ${props.alignSelf}; ` : "")}
  ${(props) => (props.zIndex ? `z-index: ${props.zIndex}; ` : "")}
  ${(props) => (props.display ? `display: ${props.display}; ` : "")}
  ${(props) =>
    props.centerFlex
      ? `display: flex; justify-content: center; align-items:center `
      : ""}
  ${(props) => (props.alignLeft ? `text-align: left;` : "")};
  ${(props) =>
    props.borderbottom ? ` border-bottom:${props.borderbottom};` : ""};
`;

// 동그라미 버튼
const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #025949;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50%;
`;

export default Button;
