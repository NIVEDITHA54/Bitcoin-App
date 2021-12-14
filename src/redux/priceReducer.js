const {
  FETCH_PRICE_REQUEST,
  FETCH_PRICE_SUCCESS,
  FETCH_PRICE_FAIL,
  ADD_CURRENT_PRICE,
  REMOVE_CURRENT_PRICE,
  ADD_SAVED_PRICE,
  REMOVE_SAVED_PRICE,
} = require("./priceConstants");

export const fetchReducer = (
  state = { loading: null, error: null },
  action
) => {
  switch (action.type) {
    case FETCH_PRICE_REQUEST:
      return { loading: true };
    case FETCH_PRICE_SUCCESS:
      return {
        loading: false,
      };
    case FETCH_PRICE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const currentPriceListReducer = (
  state = { currentPriceList: [] },
  action
) => {
  switch (action.type) {
    case ADD_CURRENT_PRICE:
      return {
        ...state,
        currentPriceList: [action.payload, ...state.currentPriceList],
      };
    case REMOVE_CURRENT_PRICE:
      return {
        ...state,
        currentPriceList: state.currentPriceList.filter(
          (x) => x.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const savedPriceListReducer = (
  state = { savedPriceList: [] },
  action
) => {
  switch (action.type) {
    case ADD_SAVED_PRICE:
      const existItem = state.savedPriceList.find(
        (x) => x.id === action.payload.id
      );
      if (existItem) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          savedPriceList: [action.payload, ...state.savedPriceList],
        };
      }

    case REMOVE_SAVED_PRICE:
      return {
        ...state,
        savedPriceList: state.savedPriceList.filter(
          (x) => x.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
