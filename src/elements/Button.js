import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    margin,
    width,
    padding,
    disable,
    bg,
    color,
    cursor,
    border,
    borderRadius,
    position,
    bottom,
    fontSize,
    alignItems,
    display,
    is_float,
    disabled,
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
    width,
    padding,
    color,
    bg,
    cursor,
    border,
    borderRadius,
    position,
    bottom,
    fontSize,
    alignItems,
    display,
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
  width: "100%",
  cursor: "pointer",
  bg: "#000000",
  border: "none",
  borderRadius: "5px",
  position: false,
  fontSize: null,
};

const ElButton = styled.button`
  box-sizing: border-box;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  ${(props) => (props.width ? `width:${props.width};` : "")};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
  cursor: ${(props) => props.cursor};
  position: ${(props) => props.position};
  ${(props) => (props.bottom ? `bottom:${props.bottom};` : "")};
  ${(props) => (props.fontSize ? `font-size:${props.fontSize};` : "")};
  align-items: ${(props) => props.alignItems};
  ${(props) => (props.display ? `display: ${props.display}; ` : "")}
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
