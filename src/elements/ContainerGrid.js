import React from "react";
import styled from "styled-components";

const ContainerGrid = (props) => {
  const { children } = props;
  return <GridBox>{children}</GridBox>;
};

ContainerGrid.defaultProps = {
  children: null,
};

const GridBox = styled.div`
  padding: 0 5%;
`;

export default ContainerGrid;
