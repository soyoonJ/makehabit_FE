import React from "react";
import styled from "styled-components";

const ContainerGrid = (props) => {
  const { children, padding, position, bg, width, height } = props;

  const styles = {
    padding,
    position,
    bg,
    width,
    height,
  };

  return <GridBox {...styles}>{children}</GridBox>;
};

ContainerGrid.defaultProps = {
  children: null,
  padding: "0 5%",
  position: null,
  bg: null,
  width: null,
  height: null,
};

const GridBox = styled.div`
  padding: ${(props) => props.padding};
  ${(props) => (props.position ? `position:${props.position};` : "")}
  ${(props) => (props.bg ? `background:${props.bg};` : "")}
  ${(props) => (props.width ? `width:${props.width};` : "")}
  ${(props) => (props.height ? `height:${props.height};` : "")}
`;

export default ContainerGrid;
