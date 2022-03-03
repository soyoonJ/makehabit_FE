import React, { useRef } from "react";
import { Text, Grid } from "../elements";
import styled from "styled-components";

const Modal = (props) => {
  const { open, close, getData, children } = props;

  const setData = (categoryName) => {
    getData(categoryName);
  };
  if (open) {
    return (
      <Container>
        <section>
          <div onClick={close}>X</div>
          <Grid padding="30px 30px 0px 30px">{children}</Grid>
        </section>
      </Container>
    );
  }
  return null;
};

Modal.defaultProps = {
  children: null,
};

const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  display: flex;

  section {
    width: 80%;
    height: 50%;
    margin: auto;
    align-self: center;
    background: #fff;
    border-radius: 10px;
  }

  section > div {
    &:nth-child(1) {
      cursor: pointer;
      text-align: right;
      margin: 20px;
      font-size: 1.3rem;
    }
  }

  section > div > div {
    &:nth-child(1) {
      font-weight: bold;
      margin-bottom: 20px;
    }
    &:nth-child(2) {
    }
  }
`;

export default Modal;
