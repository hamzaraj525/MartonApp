import types from '../constants';

let initstate = {
  userDetails: false,
  msg: false,
  guest_id: false

};

export default function (state = initstate, action) {
  let {type, payload} = action;
  switch (type) {
    case types.USER_LOGIN:
      return {...state, userDetails: payload};
    case types.NOTIFICATION_MSG:
      return {...state, msg: payload};
    case types.SIGN_OUT:
      return {...state, msg: false,userDetails:false};
    case "Guest ID":
      console.log(payload);
      return {...state, guest_id: payload};
    default:
      return state;
  }
}
