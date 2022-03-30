import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <React.Fragment>
      <Outter>
        <div>업로드중!</div>
        <Loader />
      </Outter>
    </React.Fragment>
  );
};

const Outter = styled.div`
  background: #fff;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    &:nth-child(1) {
      background: #fff;
      width: 100%;
      max-width: 420px;
      height: 100%;
      position: fixed;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
`;

const Loader = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #ff8b37;

  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
