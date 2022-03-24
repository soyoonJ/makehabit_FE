import React from "react";

import CharacterContainer from "../components/CharacterContainer";
import ItemSelect from "../components/ItemSelect";
import ButtonNavigation from "../components/ButtonNavigation";
import LoginModal from "../components/LoginModal";
import MetaTag from "../shared/MetaTag";

import { useSelector } from "react-redux";

const Character = () => {
  const modalRef = React.useRef();
  const is_token = localStorage.getItem("token") ? true : false;
  // 로그인 상태 아닐 경우 튕겨내기
  React.useEffect(() => {
    if (!is_token) {
      modalRef.current.openModal();
    }
  }, []);

  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 캐릭터꾸미기" />

      <CharacterContainer />
      <ItemSelect />
      <ButtonNavigation />

      <LoginModal ref={modalRef}></LoginModal>
    </React.Fragment>
  );
};

export default Character;
