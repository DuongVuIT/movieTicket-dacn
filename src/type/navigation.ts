export enum APP_SCREEN {
  MOVIE_DETAIL = 'MOVIE_DETAIL',
  BOTTOM_TAB = 'BOTTOM_TAB',
  MOVIE_HOME = 'MOVIE_HOME',
  WELCOME = 'WELCOME',
  REGISTER = 'REGISTER',
  TICKET = 'TICKET',
  SEARCH = 'SEARCH',
  LOGIN = 'LOGIN',
  ACCOUNT = 'ACCOUNT',
  HOME = 'HOME',
}
export type RootParamList = {
  [APP_SCREEN.HOME]: {
    uid: string;
  };
  [APP_SCREEN.WELCOME]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
  [APP_SCREEN.TICKET]: undefined;
  [APP_SCREEN.SEARCH]: undefined;
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.ACCOUNT]: {uid: string | undefined};
  [APP_SCREEN.MOVIE_HOME]: {
    uid: any | string | undefined;
  };
  [APP_SCREEN.MOVIE_DETAIL]: {
    movieId: any | string | undefined;
  };
};
