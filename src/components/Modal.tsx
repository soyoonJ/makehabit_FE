import React, { forwardRef, useImperativeHandle } from "react";
import { ReactComponent as CloseImg } from "../img/icon_close.svg";

import styled from "styled-components";

const Modal = forwardRef((props:any, ref) => {
  useImperativeHandle(ref, () => ({
    openModal() {
      setModalOpen(true);
    },
    closeModal() {
      setModalOpen(false);
    },
  }));

  const { children } = props;

  // 테스트-------------------------------
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const outSection = React.useRef();
  // ----------------------------------------

  if (modalOpen) {
    return (
      <Container
        ref={outSection}
        onClick={(e) => {
          if (outSection.current === e.target) {
            closeModal();
          }
        }}
      >
        <section>
          <div onClick={closeModal}>
            <CloseImg fill="#707070" width="1.5rem" height="1.5rem" />
          </div>
          <SectionContainer>{children}</SectionContainer>
        </section>
      </Container>
    );
  }
  return null;
});

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
    position: relative;
    width: 79.4%;
    height: auto;
    margin: auto;
    align-self: center;
    background: #fff;
    border-radius: 10px;

    & > div {
      &:nth-child(1) {
        position: absolute;
        right: 0;
        padding: 1.375rem;
        cursor: pointer;
        font-size: 1.5rem;
      }
    }
  }
`;

const SectionContainer = styled.div`
  padding: 4.14vh 3.08vh;

  & > div {
    &:nth-child(1) {
      color: #1d1b1b;
      font-weight: 700;
      font-size: 2.6vh;
      line-height: 3.41vh;
      letter-spacing: -0.005rem;
    }
  }
`;

export default Modal;

// import React, { useRef, forwardRef, useImperativeHandle } from "react";
// import { Text, Grid } from "../elements";
// import styled from "styled-components";

// const Modal = (props) => {
//   const { open, close, getData, children } = props;

//   const setData = (categoryName) => {
//     getData(categoryName);
//   };

//   // 테스트-------------------------------
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const outSection = React.useRef();
//   // ----------------------------------------

//   if (modalOpen) {
//     return (
//       <Container
//         ref={outSection}
//         onClick={(e) => {
//           if (outSection.current === e.target) {
//             console.log("close modal!");
//             closeModal();
//           }
//         }}
//       >
//         <section>
//           <div onClick={close}>X</div>
//           <Grid padding="30px 30px 0px 30px">{children}</Grid>
//         </section>
//       </Container>
//     );
//   }
//   return null;
// };

// Modal.defaultProps = {
//   children: null,
// };

// const Container = styled.div`
//   position: absolute;
//   top: 0px;
//   right: 0px;
//   bottom: 0px;
//   left: 0px;
//   background: rgba(0, 0, 0, 0.6);
//   z-index: 99;
//   display: flex;

//   section {
//     width: 80%;
//     height: 50%;
//     margin: auto;
//     align-self: center;
//     background: #fff;
//     border-radius: 10px;
//   }

//   section > div {
//     &:nth-child(1) {
//       cursor: pointer;
//       text-align: right;
//       margin: 20px;
//       font-size: 1.3rem;
//     }
//   }

//   section > div > div {
//     &:nth-child(1) {
//       font-weight: bold;
//       margin-bottom: 20px;
//     }
//     &:nth-child(2) {
//     }
//   }
// `;

// export default Modal;
