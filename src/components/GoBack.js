import React from "react";

import { history } from "../redux/configureStore";
import styled from "styled-components";

import { IoIosArrowBack } from "react-icons/io";

const GoBack = (props) => {
  const { color, padding } = props;

  return (
    <Back
      onClick={() => {
        history.goBack();
      }}
    >
      <IoIosArrowBack />
    </Back>
  );
};

GoBack.defaultProps = {
  color: "white",
  padding: "10px",
};

const Back = styled.div`
  cursor: pointer;
  z-index: 10;
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  position: absolute;
`;

export default GoBack;
