import React from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import { Grid } from "../elements";
import { ReactComponent as IconLeft } from "../img/icon_left.svg";
import MetaTag from "../shared/MetaTag";

const NotFound = (props: any) => {
  return (
    <>
      <MetaTag title="습관삼끼" />
      <Grid height="100vh">
        <Container>
          주소가 올바르지 않아요!
          <br />
          뒤로가기
          <div
            onClick={() => {
              history.goBack();
            }}
          >
            <IconLeft width="30px" height="30px" fill="#fff" />
          </div>
        </Container>
      </Grid>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;

  font-size: 22px;
  font-weight: 700;
  line-height: 50px;

  div {
    width: 50px;
    height: 50px;
    background: #ff8b37;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default NotFound;
