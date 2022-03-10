import React from "react";

import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import CharacterContainer from "../components/CharacterContainer";
import ItemSelect from "../components/ItemSelect";
import ButtonNavigation from "../components/ButtonNavigation";

const Character = () => {
  return (
    <React.Fragment>
      <CharacterContainer />
      <ItemSelect />
      <ButtonNavigation />
    </React.Fragment>
  );
};

export default Character;
