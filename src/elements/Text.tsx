import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    bold,
    color,
    size,
    children,
    margin,
    padding,
    weight,
    is_break,
    alignCenter,
    font,
    width,
    alignRight,
    borderBox,
    textAlign,
    alignLeft,
    lineHeight,
  } = props;

  const styles = {
    color,
    size,
    bold,
    margin,
    padding,
    weight,
    is_break,
    alignCenter,
    font,
    width,
    alignRight,
    borderBox,
    textAlign,
    alignLeft,
    lineHeight,
  };
  return (
    <>
      <P {...styles}>{children}</P>
    </>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#000",
  size: "14px",
  margin: false,
  padding: false,
  weight: false,
  is_break: false,
  alignCenter: false,
  width: "100%",
  alignRight: false,
  borderBox: null,
  alignLeft: false,
  lineHeight: null,
};

const P = styled.p`
  width: ${(props) => (props as any).width};
  color: ${(props) => (props as any).color};
  font-size: ${(props) => (props as any).size};
  font-weight: ${(props) =>
    (props as any).bold
      ? "600"
      : (props as any).weight
      ? (props as any).weight
      : "400"};
  ${(props) =>
    (props as any).margin ? `margin: ${(props as any).margin};` : ""}
  ${(props) =>
    (props as any).padding ? `padding: ${(props as any).padding};` : ""}
  ${(props) => ((props as any).is_break ? `word-break: break-all;` : "")}
  ${(props) => ((props as any).alignCenter ? `text-align: center;` : "")}
  ${(props) =>
    (props as any).font ? `font-family: ${(props as any).font};` : ""}
  justify-content: ${(props) => (props as any).justifyContent};
  ${(props) => ((props as any).alignRight ? `text-align: right;` : "")};
  ${(props) => ((props as any).borderBox ? `box-sizing: border-box;` : "")};
  ${(props) =>
    (props as any).textAlign ? `text-align: ${(props as any).textAlign};` : ""}
  ${(props) => ((props as any).alignLeft ? `text-align: left;` : "")};
  ${(props) =>
    (props as any).lineHeight
      ? `line-height: ${(props as any).lineHeight};`
      : ""};
`;

export default Text;
