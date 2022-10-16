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
  border: ${(props) => (props as any).border};
  border-radius: ${(props) => (props as any).borderRadius};
  ${(props) =>
    (props as any).height ? `height:${(props as any).height};` : ""};
  ${(props) =>
    (props as any).lineHeight
      ? `line-height:${(props as any).lineHeight};`
      : ""};
  ${(props) => ((props as any).width ? `width:${(props as any).width};` : "")};
  ${(props) =>
    (props as any).maxWidth ? `max-width:${(props as any).maxWidth};` : ""};
  background-color: ${(props) => (props as any).bg};
  color: ${(props) => props.color};
  padding: ${(props) => (props as any).padding};
  ${(props) =>
    (props as any).margin ? `margin:${(props as any).margin};` : ""};
  cursor: ${(props) => (props as any).cursor};
  position: ${(props) => (props as any).position};
  ${(props) =>
    (props as any).bottom ? `bottom:${(props as any).bottom};` : ""};
  ${(props) => ((props as any).right ? `right:${(props as any).right};` : "")};
  ${(props) => ((props as any).left ? `left:${(props as any).left};` : "")};
  ${(props) =>
    (props as any).fontSize ? `font-size:${(props as any).fontSize};` : ""};
  ${(props) =>
    (props as any).fontWeight
      ? `font-weight:${(props as any).fontWeight};`
      : ""};
  align-items: ${(props) => (props as any).alignItems};
  ${(props) =>
    (props as any).alignSelf ? `align-self: ${(props as any).alignSelf}; ` : ""}
  ${(props) =>
    (props as any).zIndex ? `z-index: ${(props as any).zIndex}; ` : ""}
  ${(props) =>
    (props as any).display ? `display: ${(props as any).display}; ` : ""}
  ${(props) =>
    (props as any).centerFlex
      ? `display: flex; justify-content: center; align-items:center `
      : ""}
  ${(props) => ((props as any).alignLeft ? `text-align: left;` : "")};
  ${(props) =>
    (props as any).borderbottom
      ? ` border-bottom:${(props as any).borderbottom};`
      : ""};
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
