import { query as q } from "faunadb";
import ServerSideUser from "lib/shared/user/ServerSideUser";
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
      if (e.requestResult?.statusCode === 404) {
        return null;
      } else {
        throw e;
      }
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
      if (e.requestResult?.statusCode === 404) {
        return null;
      } else {
        throw e;
      }
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
      if (e.requestResult?.statusCode === 404) {
        return null;
      } else {
        throw e;
      }
    }
  },
};

export default userHelper;
