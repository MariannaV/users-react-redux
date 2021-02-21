import { NUsers } from "./@types";

export const API_Users = {
  usersGet: (params: any) => async (dispatch: any, getStore: any) => {
    try {
      dispatch({ type: NUsers.ActionTypes.USERS_FETCH_START });
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({
        type: NUsers.ActionTypes.USERS_FETCH_SUCCESS,
        payload: await response.json(),
      });
    } catch (error) {
      dispatch({ type: NUsers.ActionTypes.USERS_FETCH_FAIL });
    }
  },
};
