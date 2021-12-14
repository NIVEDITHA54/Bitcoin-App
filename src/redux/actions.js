import Axios from "axios";
import {
  ADD_CURRENT_PRICE,
  REMOVE_CURRENT_PRICE,
  FETCH_PRICE_FAIL,
  FETCH_PRICE_REQUEST,
  FETCH_PRICE_SUCCESS,
  ADD_SAVED_PRICE,
  REMOVE_SAVED_PRICE,
} from "./priceConstants";
import { v4 as uuidv4 } from "uuid";

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const fetchData = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_PRICE_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );

    dispatch({ type: FETCH_PRICE_SUCCESS });
    dispatch({
      type: ADD_CURRENT_PRICE,
      payload: {
        id: uuidv4().slice(0, 8),
        timestamp: data.time.updated,
        usd: formatNumber(data.bpi.USD.rate_float.toFixed(1)),
        gbp: formatNumber(data.bpi.GBP.rate_float.toFixed(1)),
        euro: formatNumber(data.bpi.EUR.rate_float.toFixed(1)),
      },
    });

    //persist the data even when the browser refresh is done
    localStorage.setItem(
      "fetchedPrice",
      JSON.stringify(getState().currentPriceData.currentPriceList)
    );
  } catch (error) {
    dispatch({ type: FETCH_PRICE_FAIL, payload: error.message });
  }
};

export const removeFromCurrentList = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_CURRENT_PRICE, payload: id });
  localStorage.setItem(
    "fetchedPrice",
    JSON.stringify(getState().currentPriceData.currentPriceList)
  );
};

export const addToSavedList = (data) => (dispatch, getState) => {
  dispatch({ type: ADD_SAVED_PRICE, payload: data });
  localStorage.setItem(
    "savedPrice",
    JSON.stringify(getState().savedPriceData.savedPriceList)
  );
};

export const removeFromSavedList = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_SAVED_PRICE, payload: id });
  localStorage.setItem(
    "savedPrice",
    JSON.stringify(getState().savedPriceData.savedPriceList)
  );
};
