import React from "react";
import styled from "styled-components";
import { Text } from ".";

const Input = (props) => {
  const {
    _onChange,
    placeholder,
    type,
    value,
    padding,
    label,
    width,
    height,
    disable,
    bg,
    _onKeyDown,
    _ref,
    _onFocus,
    borderStyle,
    borderRadius,
    margin,
    color,
    _onKeyPress,
    _onBlur,
  } = props;

  const styles = {
    width,
    height,
    padding,
    bg,
    borderStyle,
    margin,
    color,
    borderRadius,
  };

  return (
    <>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput
        {...styles}
        type={type}
        onChange={_onChange}
        placeholder={placeholder}
        value={value}
        disabled={disable}
        onKeyDown={_onKeyDown}
        ref={_ref}
        onFocus={_onFocus}
        onKeyPress={_onKeyPress}
        onBlur={_onBlur}
      />
    </>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  width: "100%",
  _onChange: () => {},
  _onClick: () => {},
  disable: false,
  bg: "#fff",
  _onKeyDown: () => {},
  _ref: () => {},
  _onFocus: () => {},
  margin: false,
  _onKeyPress: () => {},
  padding: "12px 4px",
};

const ElInput = styled.input`
  width: ${(props) => (props as any).width};
  ${(props) =>
    (props as any).height ? `height: ${(props as any).height};` : ""}
  ${(props) =>
    (props as any).margin ? `margin: ${(props as any).margin};` : ""}
  ${(props) => ((props as any).color ? `color: ${(props as any).color};` : "")}
  padding: ${(props) => (props as any).padding};
  box-sizing: border-box;
  border: 1px solid #adb5bd;
  border-radius: ${(props) => (props as any).borderRadius};
  background-color: ${(props) => (props as any).bg};
  border-style: ${(props) => (props as any).borderStyle};
`;
export default Input;
