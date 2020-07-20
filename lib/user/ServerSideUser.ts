import BaseUser from "./BaseUser";

// represents data that only server has access to, even if it's
// stored in a cookie, since it's encrypted
type ServerSideUser = BaseUser & {
  passwordHash: string;
};

export default ServerSideUser;
