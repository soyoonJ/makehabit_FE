import React from "react";

import styled from "styled-components";
import { ContainerGrid, Grid, Text, Input, Image, Button } from "../elements";
import PurchaseCharacter from "../components/PurchaseCharacter";
import ShoppingList from "../components/ShoppingList";
import ButtonNavigation from "../components/ButtonNavigation";

const ShoppingBasket = () => {
  return (
    <React.Fragment>
      <PurchaseCharacter />
      <ShoppingList />
    </React.Fragment>
  );
};

export default ShoppingBasket;
