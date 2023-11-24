
import { ActionTypes } from './Login/actions';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      // Here you would typically handle the authentication logic,
      // perhaps calling an API, and then update the state.
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // In a real app, this would be more complex
      };
    // ... other action handlers
    default:
      return state;
  }
};

export default authReducer;
