import { Cookies } from "react-cookie";
const cookie = new Cookies();

const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const getUser = () => {
  const user = cookie.get("user");
  if (!user) return null;
  return typeof user === "string" ? JSON.parse(user) : user;
};

const removeUser = () => {
  cookie.remove("user", { path: "/" });
};

const setUser = (user) => {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  if (user) {
    cookie.set(
      "user",
      JSON.stringify({
        id: user?.id,
        username: user?.username,
        role: user?.role,         
        accessToken: user?.accessToken,
      }),
      {
        path: "/",
        expires: new Date(Date.now() + ONE_DAY),
      }
    );
  } else {
    removeUser();
  }
};

const TokenService = {
  getAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
