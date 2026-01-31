import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import TokenService from "../services/token.service";

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => getUser());

  function getUser() {
    const savedUser = TokenService.getUser() || null;
    return savedUser;
  }

  const logIn = (user) => {
    setUserInfo(user);
    TokenService.setUser(user); // เก็บทันทีตอน login
  };

  const logOut = () => {
    setUserInfo(null);
    TokenService.removeUser();
  };

  useEffect(() => {
    if (userInfo) {
      TokenService.setUser(userInfo);
    }
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => useContext(UserContext);
