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
    justifyContent,
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
};

const P = styled.p`
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) =>
    props.bold ? "600" : props.weight ? props.weight : "400"};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.is_break ? `word-break: break-all;` : "")}
  ${(props) => (props.alignCenter ? `text-align: center;` : "")}
  ${(props) => (props.font ? `font-family: ${props.font};` : "")}
  justify-content: ${(props) => props.justifyContent};
`;

export default Text;
