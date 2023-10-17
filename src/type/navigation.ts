export enum APP_SCREEN {
  MOVIE_DETAIL = 'MOVIE_DETAIL',
  BOTTOM_TAB = 'BOTTOM_TAB',
  WELCOME = 'WELCOME',
  REGISTER = 'REGISTER',
  TICKET = 'TICKET',
  SEARCH = 'SEARCH',
  LOGIN = 'LOGIN',
  ACCOUNT = 'ACCOUNT',
  MOVIE = 'MOVIE',
  CASTDETAILS = 'CASTDETAILS',
  MOVIE_SIMILAR = 'MOVIE_SIMILAR',
  BOOKING = 'BOOKING',
  MY_TICKET = 'MY_TICKET',
}
export type RootParamList = {
  [APP_SCREEN.MOVIE]: undefined;
  [APP_SCREEN.WELCOME]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
  [APP_SCREEN.SEARCH]: undefined;
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.ACCOUNT]: {uid: string | undefined};
  [APP_SCREEN.MOVIE_DETAIL]: {
    movieId: any | string | undefined;
  };
  [APP_SCREEN.CASTDETAILS]: {
    castId: any | string | undefined;
  };
  [APP_SCREEN.MOVIE_SIMILAR]: {
    movieId: any | string | undefined;
  };
  [APP_SCREEN.BOOKING]: {
    BgImage: string | undefined;
    PosterImage: string | undefined;
    MovieName: string | undefined;
  };
  [APP_SCREEN.TICKET]: undefined;
  [APP_SCREEN.BOTTOM_TAB]: undefined;
  [APP_SCREEN.MY_TICKET]: undefined;
};
