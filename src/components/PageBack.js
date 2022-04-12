import React from "react";

import { history } from "../redux/configureStore";
import styled from "styled-components";

import { ReactComponent as IconLeft } from "../img/icon_left.svg";

const PageBack = (props) => {
  const { color, padding, left, challenges } = props;
  const styles = { color, padding, left };

  return (
    <Back
      {...styles}
      onClick={() => {
        history.goBack();
      }}
    >
      {challenges ? (
        <img
          src={process.env.PUBLIC_URL + "/images/icon_left_shadow.png"}
          alt="뒤로가기 화살표"
          style={{ width: "45px", height: "45px" }}
        ></img>
      ) : (
        <IconLeft fill="#707070" />
      )}
    </Back>
  );
};

PageBack.defaultProps = {
  color: "#FF8B37",
  padding: null,
  left: null,
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
