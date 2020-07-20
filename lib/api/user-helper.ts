import { query as q } from "faunadb";
import ServerSideUser from "lib/user/ServerSideUser";
import serverClient from "./database";

type ResType = {
  ref: any;
  ts: any;
  data: any;
};
const userHelper = {
  getUserByEmail: async (email: string): Promise<ServerSideUser> => {
    try {
      const res: ResType = await serverClient.query(
        q.Get(q.Match(q.Index("user_by_email"), email))
      );
      const user: ServerSideUser = res.data;
      return user;
    } catch (e) {
      logError("getUser", e);
      return null;
    }
  },
  getUserById: async (userId: string): Promise<ServerSideUser> => {
    try {
      const res: ResType = await serverClient.query(
        q.Get(q.Match(q.Index("user_by_userId"), userId))
      );
      const user: ServerSideUser = res.data;
      return user;
    } catch (e) {
      logError("getUserById", e);
      return null;
    }
  },
  createUser: async (user: ServerSideUser): Promise<ServerSideUser> => {
    try {
      const res: ResType = await serverClient.query(
        q.Create(q.Collection("users"), {
          data: {
            ...user,
          },
        })
      );
      const createdUser: ServerSideUser = res.data;
      return createdUser;
    } catch (e) {
      logError("createUser", e);
      return null;
    }
  },
};
function logError(fnName: string, e: any) {
  console.error(`----------Error in "${fnName}()" of taskHelper:-----------`);
  console.error(e);
}

export default userHelper;
