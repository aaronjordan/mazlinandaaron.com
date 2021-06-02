export const LOGIN_STATE_INIT = 'LOGIN_STATE_INIT';
export const LOGOUT_ACTION = 'LOGOUT_USER';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

const DEFAULT_ROUTE = '/'

export const AppStateInit = () => ({
  email: '',
  name: '',
  activeRoute: DEFAULT_ROUTE,
});

export const AppStateReducer = (state, action) => {

  switch (action.type) {
    case LOGIN_STATE_INIT:
      if(typeof action.payload != 'object') return state;
      return {...state, ...action.payload};

    case LOGOUT_ACTION:
      return {...AppStateInit(), activeRoute: state.activeRoute || DEFAULT_ROUTE};

    case UPDATE_LOCATION:
      return {...state, activeRoute: action.payload || state.activeRoute};

    default:
      return state;
  }

};