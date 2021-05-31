export const LOGIN_STATE_INIT = 'LOGIN_STATE_INIT';
export const LOGOUT_ACTION = 'LOGOUT_USER';

export const AppStateInit = () => ({
  email: '',
  name: '',
});

export const AppStateReducer = (state, action) => {

  switch (action.type) {
    case LOGIN_STATE_INIT:
      if(typeof action.payload != 'object') return state;
      return {...state, ...action.payload};

    case LOGOUT_ACTION:
      console.log('dispatch logout')
      return AppStateInit();

    default:
      return state;
  }

};