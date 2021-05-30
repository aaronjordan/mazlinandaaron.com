export const LOGIN_STATE_INIT = 'LOGIN_STATE_INIT';

export const AppStateInit = () => ({
  email: '',
});

export const AppStateReducer = (state, action) => {

  switch (action.type) {
    case 'LOGIN_STATE_INIT':
      if(typeof action.payload != 'object') return state;
      return {...state, ...action.payload};

    default:
      return state;
  }

};