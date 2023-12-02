
import { ActionTypes } from './Login/actions';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      // Here you would typically handle the authentication logic,
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, 
      };
    default:
      return state;
  }
};

export default authReducer;
