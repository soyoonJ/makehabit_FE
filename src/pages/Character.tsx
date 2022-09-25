import React from "react";

import CharacterContainer from "../components/CharacterContainer";
import ItemSelect from "../components/ItemSelect";
import ButtonNavigation from "../components/ButtonNavigation";
import LoginModal from "../components/LoginModal";
import MetaTag from "../shared/MetaTag";

import styled from "styled-components";

const Character = () => {
  const modalRef = React.useRef();
  const is_token = localStorage.getItem("token") ? true : false;

  React.useEffect(() => {
    if (!is_token) {
      modalRef.current.openModal();
    }
  }, []);

  return (
    <Container>
      <MetaTag title="습관삼끼 | 캐릭터꾸미기" />

      <CharacterContainer />
      <ItemSelect />
      <ButtonNavigation />

      <LoginModal ref={modalRef}></LoginModal>
    </Container>
  );
};
const Container = styled.div`
  height: 100%;
  max-height: 100vh;
`;
export default Character;
