import {
  Switch,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import React from "react";
import "./App.css";
import useNetwork from "./useNetwork";
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
import Completed from "../pages/Completed";
import Chat from "../pages/Chat";
import NotFound from "../pages/NotFound";
import Search from "../pages/Search";
import ShoppingBasket from "../pages/ShoppingBasket";
import CharacterSave from "../pages/CharacterSave";
import Auth2RedirectHandler from "./Auth2RedirectHandler";
import Spinner from "./Spinner";
import RankingPage from "../pages/RankingPage";

function App() {
  const handleNetworkChange = (online) => {
    console.log(online ? "온라인" : "오프라인");
  };
  const onLine = useNetwork(handleNetworkChange);

  const dispatch = useDispatch();
  const is_token = localStorage.getItem("token") ? true : false;
  // console.log("토큰확인", is_token);

  React.useEffect(() => {
    // 로그인 후 새로고침하면 리덕스 데이터 날라감 > loginCheck 작업 필요!
    if (is_token) {
      console.log("is_token", is_token);
      dispatch(userActions.loginCheckDB());
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        {onLine ? "" : alert("인터넷 연결상태를 확인해주세요")}
        <div id="wrap">
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/category/:id" component={Category} />
              <Route path="/search" component={Search} />
              <Route path="/recommend/:id" component={Recommend} />
              <Route path="/challenges/:id" component={PostDetail} />
              <Route path="/postwrite" component={PostWrite} />
              <Route path="/confirm/:id" component={Confirm} />
              <Route path="/mychallenge/:id" component={MyChallenge} />
              <Route path="/mypage" component={Mypage} />
              <Route path="/character" component={Character} />
              <Route path="/shoppingBasket" component={ShoppingBasket} />
              <Route path="/myfeed/:id" component={MyFeed} />
              <Route path="/completed/:id" component={Completed} />
              <Route path="/chat/:id" component={Chat} />
              <Route path="/charactersave" component={CharacterSave} />
              <Route path="/kakao" component={Auth2RedirectHandler}></Route>
              <Route path="/ranking" component={RankingPage} />

              <Route path="*" exact component={NotFound} />
            </Switch>
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
  flex-direction: column; // 아이템이 세로방향으로 흐릴 수 있도록(상>하)
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  position: relative; //absolute를 쓸때 영역을 잡아주는 역할
  background: url("/banner/background_banner.webp");
  background-size: cover;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 420px) {
    max-height: 100vh;
    // overflow: auto;
  }

  #wrap {
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }

    overflow-y: scroll;
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
      // 최소 min-width 값이상이면 아래 조건을 실행
      position: relative;
      left: 15%;
      top: 0%;
      overflow: auto; //컨텐츠 양에 따라 스코롤바 추가할지 자동으로 결정
    }
  }

  @media screen and (min-width: 1200px) {
    background-size: 100% 100vh;
  }
`;

export default App;
