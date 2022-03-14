import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

// const SET_ALL = "SET_ALL";
const SET_ITEMS = "SET_ITEMS";
const SELECTED_ITEMS = "SELECTED_ITEMS";
const BACKGROUND_PREVIEW = "BACKGROUND_PREVIEW";
const COLOR_PREVIEW = "COLOR_PREVIEW";
const EMOTION_PREVIEW = "EMOTION_PREVIEW";
const CLOTHES_PREVIEW = "CLOTHES_PREVIEW";
const ACC_PREVIEW = "ACC_PREVIEW";

// const setAll = createAction(SET_ALL, (allList) => ({ allList }));
const setItems = createAction(SET_ITEMS, (itemList, category) => ({
  itemList,
  category,
}));
// dispatch 여러개 만들어야 하나?
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

const initialState = {
  itemList: [],
  // allList: [],
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
};

//캐릭터 아이템 목록받기
const getItemDB = (category) => {
  return function (dispatch, getState, { history }) {
    apis
      .GetItemList()
      .then(function (res) {
        console.log("아이템", res);
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
        // console.log("아이템 구매 및 저장", response);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };
};

// 마이페이지 캐릭터
const mypageCharacterList = () => {
  return function (dispatch, getState, { history }) {
    apis
      .mypageCharacter()
      .then(function (res) {
        console.log("내캐릭터", res.data.character.equippedItems);
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
        console.log("GETLIST", action.payload);
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
        console.log("찍히나요", draft.isEquip);
      }),
    [SELECTED_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.selected = action.payload.selected;
      }),

    [BACKGROUND_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.backgroundItem = action.payload.backgroundItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter(
          (e) => !e?.includes("background")
        );
        draft.shopList.push(action.payload.backgroundItem);
        // console.log("배경", action.payload.backgroundItem);
      }),
    [COLOR_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.colorItem = action.payload.colorItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter((e) => !e?.includes("color"));
        draft.shopList.push(action.payload.colorItem);
      }),
    [EMOTION_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.emotionItem = action.payload.emotionItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter((e) => !e?.includes("emotion"));
        draft.shopList.push(action.payload.emotionItem);
      }),
    [CLOTHES_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.clothesItem = action.payload.clothesItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter((e) => !e?.includes("clothes"));
        draft.shopList.push(action.payload.clothesItem);
        // console.log("옷", action.payload.clothesItem);
      }),
    [ACC_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.accItem = action.payload.accItem;
        draft.shopList = draft.shopList.filter((e) => e !== null);
        draft.shopList = draft.shopList.filter((e) => !e?.includes("acc"));
        draft.shopList.push(action.payload.accItem);
        // console.log("악세사리", action.payload.accItem);
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
};

export { actionCreators };
