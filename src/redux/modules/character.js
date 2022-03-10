import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";

const SET_ITEMS = "SET_ITEMS";
const ITEM_PREVIEW = "ITEM_PREVIEW";
const SELECTED_ITEMS = "SELECTED_ITEMS";

const setItems = createAction(SET_ITEMS, (item_list) => ({ item_list }));
// dispatch 여러개 만들어야 하나?
const itemPreview = createAction(ITEM_PREVIEW, (item) => ({ item }));
const selectedItems = createAction(SELECTED_ITEMS, (selected) => ({
  selected,
}));

const initialState = {
  item_list: [],
  item: null,
  selected: null,
};

const getItemDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getItemList()
      .then(function (res) {
        console.log(res);
        // dispatch(setItems(res.data))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export default handleActions(
  {
    [SET_ITEMS]: (state, action) =>
      produce(state, (draft) => {
        draft.item_list = action.payload.item_list;
      }),
    [ITEM_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.item = action.payload.item;
        console.log("아이템바뀌니?", action.payload.item);
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
};

export { actionCreators };
