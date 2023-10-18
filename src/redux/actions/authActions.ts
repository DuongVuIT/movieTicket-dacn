// authActions.ts
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SAVE_TICKET = 'SAVE_TICKET';

interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: {
    user: string;
    token: string;
  };
}

interface RemoveTokenAction {
  type: typeof REMOVE_TOKEN;
}

interface SaveTicketAction {
  type: typeof SAVE_TICKET;
  payload: string;
}

export type AuthActionTypes =
  | SetTokenAction
  | LoginSuccessAction
  | RegisterSuccessAction
  | RemoveTokenAction
  | SaveTicketAction;

export const setToken = (token: string): SetTokenAction => ({
  type: SET_TOKEN,
  payload: token,
});

export const loginSuccess = (uid: string): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: uid,
});

export const registerSuccess = (
  user: string,
  token: string,
): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  payload: {user, token},
});

export const removeToken = (): RemoveTokenAction => ({
  type: REMOVE_TOKEN,
});

export const saveTicket = (ticketId: string): SaveTicketAction => ({
  type: SAVE_TICKET,
  payload: ticketId,
});
