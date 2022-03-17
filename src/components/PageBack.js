import React from "react";

import { history } from "../redux/configureStore";
import styled from "styled-components";

import { IoIosArrowBack } from "react-icons/io";

const PageBack = (props) => {
  const { color, padding, left } = props;
  const styles = { color, padding, left };

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
          size: "10px",
        }}
      />
    </Back>
  );
};

PageBack.defaultProps = {
  color: "#707070",
  padding: null,
  left: null,
  // padding: "1.912em 5%",
};

const Back = styled.div`
  cursor: pointer;
  z-index: 10;
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  position: absolute;
  ${(props) => (props.left ? `left: 0;` : "")};
`;

export default PageBack;
