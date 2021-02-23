import React from "react";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { get } from "lodash-es";
import CONSTANTS from "../consts";
import { NUsers } from "./users/@types";
import { userReducer } from "./users/reducer";

export interface IStore {
  users: NUsers.IStore;
}

export function configureStore(preloadedState?: IStore) {
  const middlewares = [thunkMiddleware],
    composedEnhancers =
      (CONSTANTS.isDev &&
        get(
          global,
          "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__",
          Function.prototype
        )({ trace: true })) ||
      compose,
    enhancer = composedEnhancers(applyMiddleware(...middlewares));

  return createStore(
    combineReducers<IStore>({
      users: userReducer,
    }),
    preloadedState,
    enhancer
  );
}
