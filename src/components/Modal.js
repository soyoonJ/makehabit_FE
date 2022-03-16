import React, { useRef, forwardRef, useImperativeHandle } from "react";
// import { Text, Grid } from "../elements";
import styled from "styled-components";

const Modal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModal() {
      setModalOpen(true);
    },
    closeModal() {
      setModalOpen(false);
    },
  }));

  const { open, close, getData, children } = props;

  const setData = (categoryName) => {
    getData(categoryName);
  };

  // 테스트-------------------------------
  const [modalOpen, setModalOpen] = React.useState(false);
  // const openModal = () => {
  //   setModalOpen(true);
  // };

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
            // console.log("close modal!");
            closeModal();
          }
        }}
      >
        <section>
          <div onClick={closeModal}>X</div>
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
  padding: 3rem 2.875em 3.125rem 2.875em;

  & > div {
    &:nth-child(1) {
      color: #1d1b1b;
      font-weight: 700;
      font-size: 1.375rem;
      line-height: 1.813rem;
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
