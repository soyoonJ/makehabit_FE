// 액션 만들어주는 것들
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

//actions
const GET_LIST = "GET_LIST";

//action creator
const getList = createAction(GET_LIST, (itemList, category) => ({
  itemList,
  category,
}));

//initialize
const initialState = {
  itemList: [],
};

// 캐릭터 샵 아이템 리스트 조회
const getItemList = (category) => {
  return function (dispatch, getState, { history }) {
    apis
      .ShopItemList()
      .then(function (response) {
        console.log("아이템 리스트 조회", response);
        dispatch(getList(response.data, category));
        console.log("들어갔냐?");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

// 캐릭터 샵 아이템 구매 및 저장
const purchaseItemList = () => {
  return function (dispatch, getState, { history }) {
    apis
      .PurchaseItem()
      .then(function (response) {
        console.log("아이템 구매 및 저장", response);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

// redux
export default handleActions(
  {
    [GET_LIST]: (state, action) =>
      produce(state, (draft) => {
        console.log("GETLIST", action.payload);
        if (action.payload.category === undefined) {
          draft.itemList = action.payload.itemList.items;
        } else {
          draft.itemList = action.payload.itemList.items.filter(
            (e, i) => e.category === action.payload.category
          );
        }
      }),
  },
  initialState
);

const actionCreators = {
  getItemList,
  purchaseItemList,
};

export { actionCreators };
