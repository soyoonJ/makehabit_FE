import React from "react";

import { history } from "../redux/configureStore";
import styled from "styled-components";

// import { IoIosArrowBack } from "react-icons/io";
import { ReactComponent as IconLeft } from "../img/icon_left.svg";

const PageBack = (props) => {
  const { color, padding, left, challenges } = props;
  const styles = { color, padding, left };
  // const Image = process.env.PUBLIC_URL + "/images";
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

// const Img = styled.img`
//   width: 28px;
//   height: 28px;
// `;

export default PageBack;
