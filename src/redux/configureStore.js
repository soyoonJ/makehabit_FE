import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Challenge from "./modules/challenge";
import Main from "./modules/main";
import Character from "./modules/character";

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

  // 만든 history랑 라우터를 연결시켜 줌
  router: connectRouter(history),
});

// withExtraArgument - 다른 인수를 더 넘겨줄게~ => 히스토리를 만든 히스토리로 넘겨주기
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
// 개발할 때만 필요하기 때문에 import 안하고 require로 불러오는거! 다른 때는 굳이 두면 모듈 크기만 커짐
if (env === "development") {
  // require는 패키지 쓰려고 가지고 올 때 사용
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 안 써도 상관은 없지만 쓰면 엄청 편함!
const composeEnhancers =
  // 브라우저 환경일 때만 돌아가도록 함
  // window redux devtools가 깔려있으면 열어준다는 뜻
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 미들웨어 묶기
// 지금까지 있었던 모든 미들웨어 합치기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rootReducer랑 enhancer 합침
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
