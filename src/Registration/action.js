// Action Types
export const ActionTypes = {
    REGISTER: 'REGISTER',
  };
  
  // Action Creators
  export const registerAction = (userData) => {
    return {
      type: ActionTypes.REGISTER,
      payload: userData,
    };
  };
  