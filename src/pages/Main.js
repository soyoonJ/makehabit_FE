import React from "react";
import styled from "styled-components";
import { Button, Input, Text, Image } from "../elements";

const Main = () => {
  return (
    <React.Fragment>
      <Header>
        <Image src="imges/logoEx.png" alt=""></Image>
      </Header>
    </React.Fragment>
  );
};

const Header = styled.div`
  margin: 5% 3%;
`;

export default Main;
