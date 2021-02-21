export namespace NUsers {
  export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      city: string;
      zipcode: string;
      geo: {
        lat: number;
        lng: number;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }

  export interface IStore {
    list: Array<IUser["id"]>;
    map: Record<IUser["id"], IUser>;
    isLoading: null | boolean;
  }

  export type IActions = IUsersFetch;

  export enum ActionTypes {
    USERS_FETCH_START = "USERS_FETCH_START",
    USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS",
    USERS_FETCH_FAIL = "USERS_FETCH_FAIL",
  }
  export type IUsersFetch =
    | { type: ActionTypes.USERS_FETCH_START }
    | { type: ActionTypes.USERS_FETCH_FAIL; errors: any }
    | {
        type: ActionTypes.USERS_FETCH_SUCCESS;
        payload: Array<IUser>;
      };
}
