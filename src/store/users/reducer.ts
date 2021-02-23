import produce from "immer";
import { NUsers } from "./@types";

function getInitialState(): NUsers.IStore {
  return {
    map: {},
    list: [],
    isLoading: null,
  };
}

export const userReducer = produce(
  (draft: NUsers.IStore, action: NUsers.IActions) => {
    switch (action.type) {
      case NUsers.ActionTypes.USERS_FETCH_START: {
        draft.isLoading = true;
        break;
      }

      case NUsers.ActionTypes.USERS_FETCH_SUCCESS: {
        draft.isLoading = false;
        for (const user of action.payload) {
          if (!(user.id in draft.map)) {
            draft.list.push(user.id);
          }
          draft.map[user.id] = user;
        }
        break;
      }

      case NUsers.ActionTypes.USERS_FETCH_FAIL: {
        draft.isLoading = false;
        break;
      }
    }
  },
  getInitialState()
);
