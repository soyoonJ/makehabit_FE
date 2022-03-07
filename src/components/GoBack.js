import React from "react";

import { history } from "../redux/configureStore";
import styled from "styled-components";

import { IoIosArrowBack } from "react-icons/io";

const GoBack = () => {
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

const Back = styled.div`
  cursor: pointer;
  z-index: 10;
  padding: 10px;
  color: white;
  position: absolute;
`;

export default GoBack;
