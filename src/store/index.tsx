import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { userReducer } from "./users/reducer";
import thunkMiddleware from "redux-thunk";
import { get } from "lodash-es";
import CONSTANTS from "../consts";
import React from "react";
import { NUsers } from "./users/@types";

export interface IStore {
  users: NUsers.IStore;
}

export function configureStore(preloadedState?: any) {
  const middlewares = [thunkMiddleware],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    composedEnhancers =
      (CONSTANTS.isDev &&
        get(
          global,
          "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__",
          Function.prototype
        )({ trace: true })) ||
      compose,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enhancer = composedEnhancers(applyMiddleware(...middlewares));

  return createStore(
    combineReducers<IStore>({
      users: userReducer,
    }),
    preloadedState,
    enhancer
  );
}
