import React from "react";

import { history } from "../redux/configureStore";

const MyFeed = (props) => {
  return (
    <React.Fragment>
      <div
        onClick={() => {
          history.replace("/mychallenge");
        }}
      >
        X
      </div>
      <div>이미지 가득 채우기</div>
      <div>타이틀</div>
      <div>코멘트</div>
    </React.Fragment>
  );
};

export default MyFeed;
