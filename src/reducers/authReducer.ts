import {REGISTER_SUCCESS, REMOVE_TOKEN, SET_TOKEN} from '@actions/authActions';

const initialState = {
  user: null,
  isLogin: false,
  token: null,
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        isLogin: true,
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
        token: null,
      };
    default:
      return state;
  }
}
