import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import React from "react";

import styled from "styled-components";

import Main from "../pages/Main";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Category from "../pages/Category";
import PostDetail from "../pages/PostDetail";
import PostWrite from "../pages/PostWrite";
import Confirm from "../pages/Confirm";
import MyChallenge from "../pages/MyChallenge";
import Mypage from "../pages/Mypage";
import Character from "../pages/Character";
import Recommend from "../pages/Recommend";
import MyFeed from "../components/MyFeed";
import Chat from "../pages/Chat";

function App() {
  // const dispatch = useDispatch();
  // const is_token = localStorage.getItem("token") ? true : false;

  // React.useEffect(()=>{
  //   // 로그인 후 새로고침하면 리덕스 데이터 날라감 > loginCheck 작업 필요!
  //   if (is_token){
  //     // dispatch(userActions.loginCheckFB());
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Container>
        <div id="wrap">
          <ConnectedRouter history={history}>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/category" component={Category} />
            <Route path="/recommend" component={Recommend} />
            <Route path="/post/:id" component={PostDetail} />
            <Route path="/postwrite" component={PostWrite} />
            <Route path="/confirm" component={Confirm} />
            <Route path="/mychallenge" component={MyChallenge} />
            <Route path="/mypage" component={Mypage} />
            <Route path="/character" component={Character} />
            <Route path="/myfeed/:id" component={MyFeed} />
            <Route path="/chat/:id" component={Chat} />
          </ConnectedRouter>
        </div>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* background: #d9e3ee; */
  overflow: hidden;
  position: relative;
  background: url("/images/text.png");
  background-size: cover;

  #wrap {
    width: 100%;
    max-width: 420px;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 auto;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    @media screen and (min-width: 1024px) {
      position: relative;
      left: 15%;
      top: 0%;
      overflow: auto;
    }
  }
  @media screen and (min-width: 1200px) {
    background-size: 100% 100vh;
  }
`;

export default App;
