import React from "react";
import styled from "styled-components";

const ContainerGrid = (props) => {
  const { children, padding, margin, position, bg, width, height } = props;

  const styles = {
    padding,
    margin,
    position,
    bg,
    width,
    height,
  };

  return <GridBox {...styles}>{children}</GridBox>;
};

ContainerGrid.defaultProps = {
  children: null,
  padding: "0 1.250rem",
  position: null,
  bg: null,
  width: null,
  height: null,
};

const GridBox = styled.div`
  padding: ${(props) => (props as any).padding};
  ${(props) =>
    (props as any).margin ? `margin:${(props as any).margin};` : ""}
  ${(props) =>
    (props as any).position ? `position:${(props as any).position};` : ""}
  ${(props) => ((props as any).bg ? `background:${(props as any).bg};` : "")}
  ${(props) => ((props as any).width ? `width:${(props as any).width};` : "")}
  ${(props) =>
    (props as any).height ? `height:${(props as any).height};` : ""}
`;

export default ContainerGrid;
