import BaseUser from "./BaseUser";

// data the browser has access to
type ClientSideUser = BaseUser & {
  isLoggedIn: boolean;
};

export default ClientSideUser;
