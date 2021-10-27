import types from '../constants';

let initstate = {
  cartItems: [],
};

export default function (state = initstate, action) {
  let {type, payload} = action;
  switch (type) {
    case types.CART_LIST:
      
      return {
        ...state,
        cartItems: payload,
      };

    default:
      return state;
  }
}
