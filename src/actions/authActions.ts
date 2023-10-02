// authActions.ts
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const setToken = (token: any) => ({
  type: SET_TOKEN,
  payload: token,
});
export const loginSuccess = (uid: string) => ({
  type: LOGIN_SUCCESS,
  payload: uid,
});
export function registerSuccess(user: any, token: any) {
  return {
    type: REGISTER_SUCCESS,
    payload: {user, token},
  };
}
export const removeToken = () => ({
  type: REMOVE_TOKEN,
});
