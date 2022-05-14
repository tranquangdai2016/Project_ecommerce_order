let initialState = {}

// load user items from lacalstorage
if (typeof window !== 'undefined') {
    if (localStorage.getItem('users')) {
        initialState = JSON.parse(localStorage.getItem('users'))
    } else {
        initialState = {}; 
    }
}

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        user: payload
      };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
