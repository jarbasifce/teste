export const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        token: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        user: action.user,
        token: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        user: null,
        token: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        user: action.user,
        token: action.token,
        isLoading: false,
      };
    default:
      return prevState;
  }
};
