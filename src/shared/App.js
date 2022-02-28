import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import React from "react";

import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

function App() {
  return (
    <React.Fragment>
      <Container>
        <div id="wrap">안녕하세요</div>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #d9e3ee;
  overflow: hidden;
  position: relative;

  #wrap {
    width: 100%;
    max-width: 420px;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 auto;
    box-sizing: border-box;
    background-color: #d9e3ee;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    @media screen and (min-width: 1024px) {
      position: relative;
      left: 15%;
      top: 0%;
      overflow: auto;
    }
  }
  @media screen and (min-width: 1200px) {
    background-size: 100% 100vh;
  }
`;

export default App;
