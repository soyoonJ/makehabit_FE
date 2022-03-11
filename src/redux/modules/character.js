import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

const SET_ITEMS = "SET_ITEMS";
const ITEM_PREVIEW = "ITEM_PREVIEW";
const SELECTED_ITEMS = "SELECTED_ITEMS";

const setItems = createAction(SET_ITEMS, (itemList, category) => ({
  itemList,
  category,
}));
// dispatch 여러개 만들어야 하나?
const itemPreview = createAction(ITEM_PREVIEW, (item) => ({ item }));
const selectedItems = createAction(SELECTED_ITEMS, (selected) => ({
  selected,
}));

const initialState = {
  itemList: [],
  item: null,
  selected: null,
};

//캐릭터 아이템 목록받기
const getItemDB = (category) => {
  return function (dispatch, getState, { history }) {
    apis
      .GetItemList()
      .then(function (res) {
        console.log(res);
        dispatch(setItems(res.data, category));
      })
      .catch((error) => {
        console.log(error);
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

export default handleActions(
  {
    [SET_ITEMS]: (state, action) =>
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
    [ITEM_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.item = action.payload.item;
      }),
    [SELECTED_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.selected = action.payload.selected;
      }),
  },
  initialState
);

const actionCreators = {
  setItems,
  getItemDB,
  itemPreview,
  selectedItems,
  purchaseItemList,
};

export { actionCreators };
