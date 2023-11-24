// Action Types
export const ActionTypes = {
    LOGIN: 'LOGIN',
  };
  
  // Action Creators
  export const loginAction = (email, password) => {
    return {
      type: ActionTypes.LOGIN,
      payload: { email, password },
    };
  };
  