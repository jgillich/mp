import {createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import * as createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import * as PouchMiddleware from "pouch-redux-middleware";
import {routerMiddleware } from "react-router-redux";
import {browserHistory } from "react-router";
import schema from "./schema";
import db from "./db";

export default function configureStore(initialState) {
  // FIXME warning: variable "store" used before declaration
  /* tslint:disable:no-use-before-declare */
  const pouchMiddleware = PouchMiddleware(
    schema.map(type => ({
        actions: {
          insert: doc => {
            if(doc.type == type.singular) {
              store.dispatch({
                [type.singular]: doc,
                type: "INSERT_" + type.singular.toUpperCase(),
              });
            }
          },
          remove: doc => {
          if(doc.type == type.singular) {
              store.dispatch({
                [type.singular]: doc,
                type: "REMOVE_" + type.singular.toUpperCase(),
              });
            }
          },
          update: doc => {
            if(doc.type == type.singular) {
              store.dispatch({
                [type.singular]: doc,
                type: "UPDATE_" + type.singular.toUpperCase(),
              });
            }
          },
        },
        db: db,
        path: `/${type.plural}`,
    })));

  const applyMiddlewares = applyMiddleware(
    pouchMiddleware,
    thunkMiddleware,
    routerMiddleware(browserHistory),
    (createLogger as any)()
  );

  const createStoreWithMiddleware = compose(
    applyMiddlewares
  )(createStore);

  let store = createStoreWithMiddleware(
    rootReducer,
    initialState
  );

  return store;
};
