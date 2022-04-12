import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

const SET_ITEMS = "SET_ITEMS";
const SELECTED_ITEMS = "SELECTED_ITEMS";
const BACKGROUND_PREVIEW = "BACKGROUND_PREVIEW";
const COLOR_PREVIEW = "COLOR_PREVIEW";
const EMOTION_PREVIEW = "EMOTION_PREVIEW";
const CLOTHES_PREVIEW = "CLOTHES_PREVIEW";
const ACC_PREVIEW = "ACC_PREVIEW";
const RESET_ITEMS = "RESET_ITEMS";

const setItems = createAction(SET_ITEMS, (itemList, category) => ({
  itemList,
  category,
}));
const selectedItems = createAction(SELECTED_ITEMS, (selected) => ({
  selected,
}));
const backgroundPreview = createAction(
  BACKGROUND_PREVIEW,
  (backgroundItem) => ({ backgroundItem })
);
const colorPreview = createAction(COLOR_PREVIEW, (colorItem) => ({
  colorItem,
}));
const emotionPreview = createAction(EMOTION_PREVIEW, (emotionItem) => ({
  emotionItem,
}));
const clothesPreview = createAction(CLOTHES_PREVIEW, (clothesItem) => ({
  clothesItem,
}));
const accPreview = createAction(ACC_PREVIEW, (accItem) => ({ accItem }));
const resetItems = createAction(RESET_ITEMS, () => ({}));

const initialState = {
  allList: [],
  itemList: [],
  item: null,
  selected: null,
  currentPoint: null,
  isEquip: null,
  shopList: ["color_01.png"],
  backgroundItem: null,
  colorItem: null,
  emotionItem: null,
  clothesItem: null,
  accItem: null,

  isReset: false,
};

const getItemDB = (category) => {
  return function (dispatch, getState, { history }) {
    apis
      .GetItemList()
      .then(function (res) {
        dispatch(setItems(res.data, category));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const purchaseItemList = (totalPrice, items) => {
  return function (dispatch, getState, { history }) {
    apis
      .PurchaseItem(totalPrice, items)
      .then(function (response) {
        history.push("/charactersave");
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

const mypageCharacterList = () => {
  return function (dispatch, getState, { history }) {
    apis
      .mypageCharacter()
      .then(function (res) {
        dispatch(selectedItems(res.data.character.equippedItems));
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
        draft.allList = action.payload.itemList.items;

        if (action.payload.category === undefined) {
          draft.itemList = action.payload.itemList.items;
          draft.currentPoint = action.payload.itemList.characterCurrentPoint;
          draft.isEquip = action.payload.itemList.items.filter(
            (e) => e.isEquip === true
          );
        } else {
          draft.itemList = action.payload.itemList.items.filter(
            (e, i) => e.category === action.payload.category
          );
          draft.currentPoint = action.payload.itemList.characterCurrentPoint;
          draft.isEquip = action.payload.itemList.items.filter(
            (e) => e.isEquip === true
          );
        }
      }),
    [SELECTED_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.selected = action.payload.selected;
      }),

    [BACKGROUND_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.isReset = false;
        draft.backgroundItem = action.payload.backgroundItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter(
          (e) => !e?.includes("background")
        );
        draft.shopList.push(action.payload.backgroundItem);
      }),
    [COLOR_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.isReset = false;
        draft.colorItem = action.payload.colorItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter((e) => !e?.includes("color"));
        draft.shopList.push(action.payload.colorItem);
      }),
    [EMOTION_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.isReset = false;
        draft.emotionItem = action.payload.emotionItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter((e) => !e?.includes("emotion"));
        draft.shopList.push(action.payload.emotionItem);
      }),
    [CLOTHES_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.isReset = false;
        draft.clothesItem = action.payload.clothesItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter((e) => !e?.includes("clothes"));
        draft.shopList.push(action.payload.clothesItem);
      }),
    [ACC_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.isReset = false;
        draft.accItem = action.payload.accItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter((e) => !e?.includes("acc"));
        draft.shopList.push(action.payload.accItem);
      }),
    [RESET_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.isReset = true;
      }),
  },
  initialState
);

const actionCreators = {
  setItems,
  getItemDB,

  backgroundPreview,
  colorPreview,
  emotionPreview,
  clothesPreview,
  accPreview,

  selectedItems,
  purchaseItemList,
  mypageCharacterList,

  resetItems,
};

export { actionCreators };
