import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allProducts from "./allProducts";

//App Reducer
const reducer = combineReducers({ auth, allProducts });

//Middleware
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

// Store
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
