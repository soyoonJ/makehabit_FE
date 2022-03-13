import React from "react";

import { history } from "../redux/configureStore";
import styled from "styled-components";

import { IoIosArrowBack } from "react-icons/io";

const GoBack = (props) => {
  const { color, padding } = props;
  const styles = { color, padding };

  return (
    <Back
      {...styles}
      onClick={() => {
        history.goBack();
      }}
    >
      <IoIosArrowBack
        style={{
          width: "30",
          height: "30",
          color: "white",
          size: "10px",
        }}
      />
    </Back>
  );
};

GoBack.defaultProps = {
  color: "white",
  padding: "1.912em 5%",
};

const Back = styled.div`
  cursor: pointer;
  z-index: 10;
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  position: absolute;
`;

export default GoBack;
