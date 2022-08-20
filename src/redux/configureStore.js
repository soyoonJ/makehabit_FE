import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Challenge from "./modules/challenge.tsx";
import Main from "./modules/main";
import Character from "./modules/character";
import Ranking from "./modules/ranking";

// 히스토리 객체 만들기
export const history = createBrowserHistory();

// rootReducer 준비
// redux에 있는 모듈들 합하기
const rootReducer = combineReducers({
  user: User,
  post: Post,
  challenge: Challenge,
  main: Main,
  character: Character,
  ranking: Ranking,

  // 만든 history랑 라우터를 연결시켜 줌
  router: connectRouter(history),
});
// export type RootState = ReturnType<typeof rootReducer>;

// withExtraArgument - 다른 인수를 더 넘겨줄게~ => 히스토리를 만든 히스토리로 넘겨주기
const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
//
const composeEnhancers =
  // 브라우저 환경일 때만 돌아가도록 함
  // window redux devtools가 깔려있으면 열어준다는 뜻
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rootReducer랑 enhancer 합침
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
