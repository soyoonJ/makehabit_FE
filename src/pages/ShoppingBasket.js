import React from "react";

import PurchaseCharacter from "../components/PurchaseCharacter";
import ShoppingBasketModal from "../components/ShoppingBasketModal";

const ShoppingBasket = () => {
  return (
    <React.Fragment>
      <PurchaseCharacter />
      <ShoppingBasketModal />
    </React.Fragment>
  );
};

export default ShoppingBasket;
