import { createContext, useEffect, useReducer } from "react";
import {
  createUserFromAuth,
  onAppAuthStateChanged,
} from "utils/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
});

const userSlice = {
  currentUser: null,
};

const userActionTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return alert("error occurred");
  }
};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, userSlice);

  useEffect(() => {
    const unsubscribe = () =>
      onAppAuthStateChanged((user) => {
        if (user) {
          createUserFromAuth(user);
        }

        dispatch({ type: userActionTypes.SET_CURRENT_USER, payload: user });
      });

    return unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
