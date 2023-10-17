import {
  AuthActionTypes,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REMOVE_TOKEN,
  SAVE_TICKET,
  SET_TOKEN,
} from '@redux/actions/authActions';

export interface AuthTypes {
  isLogin: boolean;
  token: string;
  uid: string;
  ticketId: string;
}
const initialState: AuthTypes = {
  isLogin: false,
  token: '',
  uid: '',
  ticketId: '',
};

export const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isLogin: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        uid: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: '',
      };
    case SAVE_TICKET:
      return {
        ...state,
        ticketId: action.payload,
      };

    default:
      return state;
  }
};
