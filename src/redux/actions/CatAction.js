import axios from 'axios';
import types from '../constants';
import {Reducer} from 'redux';

export const addItemInCart = (item, guestID, userID) => async (dispatch) => {
  let result = await axios.get(
    `https://thecodeditors.com/test/carobar/api-get-cartadd.php?guest_id=${guestID}&product_id=${item.pro_id}&quantity=1&user_id=${userID}`,
  );
  console.log(result.data.Data);
  dispatch(cartList(guestID, userID));
};

export const cartList = (guestID, userID) => async (dispatch) => {
  try {
    let result = await axios.get(
      `https://thecodeditors.com/test/carobar/api-get-cartshow.php?user_id=${userID}&guest_id=${guestID}`,
    );
    if (result.data.Data) {
      dispatch({
        type: types.CART_LIST,
        payload: result.data.Data,
      });
    } else {
      dispatch({
        type: types.CART_LIST,
        payload: result.data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.INTERNET_ERROR,
      payload: 'Error',
    });
  }
};
