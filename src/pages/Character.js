import React from "react";

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
