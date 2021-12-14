import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  fetchReducer,
  currentPriceListReducer,
  savedPriceListReducer,
} from "./priceReducer";

const initialState = {
  currentPriceData: {
    currentPriceList: localStorage.getItem("fetchedPrice")
      ? JSON.parse(localStorage.getItem("fetchedPrice"))
      : [],
  },
  savedPriceData: {
    savedPriceList: localStorage.getItem("savedPrice")
      ? JSON.parse(localStorage.getItem("savedPrice"))
      : [],
  },
};
const reducer = combineReducers({
  fetchStatus: fetchReducer,
  currentPriceData: currentPriceListReducer,
  savedPriceData: savedPriceListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
