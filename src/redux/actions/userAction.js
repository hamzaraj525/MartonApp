import axios from 'axios';
import types from '../constants';

export const loginUser = (login) => async (dispatch) => {
  try {
    console.log(login);
    let result = await axios.get(
      `http://thecodeditors.com/test/carobar/api-user-login.php?email=${login.email}&password=${login.password}`,
    );
    console.log(result.data);
    if (result.data.status === 200) {
      dispatch({
        type: types.NOTIFICATION_MSG,
        payload: result.data.result,
      });
      dispatch({
        type: types.USER_LOGIN,
        payload: result.data,
      });
      setTimeout(() => {
        dispatch({
          type: types.NOTIFICATION_MSG,
          payload: false,
        });
      }, 3000);
    }
    if (result.data.status === 404) {
      console.log(result.data.result);
      dispatch({
        type: types.NOTIFICATION_MSG,
        payload: result.data.result,
      });
      setTimeout(() => {
        dispatch({
          type: types.NOTIFICATION_MSG,
          payload: false,
        });
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.INTERNET_ERROR,
      payload: 'Error',
    });
  }
};


export const signUpUser = (user) => async (dispatch) => {
  try {
    let date = new Date()
    let result = await axios.get(
      `http://thecodeditors.com/test/carobar/api-user-signup.php?name=${user.firstname} ${user.lastname}&email=${user.email}&pass=${user.password}&date=${date.getDate}-${date.getMonth+1}-${date.getFullYear()}&status=1&role=user`,
    );
    console.log(result.data);
    if (result.data.status === 200) {
      dispatch({
        type: types.NOTIFICATION_MSG,
        payload: result.data.result,
      });
      setTimeout(() => {
        dispatch({
          type: types.NOTIFICATION_MSG,
          payload: false,
        });
      }, 3000);
    }
    if (result.data.status == 409) {
      dispatch({
        type: types.NOTIFICATION_MSG,
        payload: result.data.result,
      });
      setTimeout(() => {
        dispatch({
          type: types.NOTIFICATION_MSG,
          payload: false,
        });
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.INTERNET_ERROR,
      payload: 'Error',
    });
  }
}; 