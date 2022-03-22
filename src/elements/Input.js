import React from "react";
// import styled, { withTheme } from "styled-components";
import styled from "styled-components";
import { Text } from ".";

const Input = (props) => {
  const {
    _onChange,
    placeholder,
    type,
    value,
    padding,
    // is_submit,
    // onSubmit,
    // is_radio,
    // name,
    // checked,
    // multiline,
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
  width: ${(props) => props.width};
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: 1px solid #adb5bd;
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.bg};
  border-style: ${(props) => props.borderStyle};
`;
export default Input;
