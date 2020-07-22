import { RequestHandler } from "next-connect";
import { NextApiResponse } from "next";
import { ExtendedRequestType } from "./handler";
import ServerSideUser from "lib/shared/user/ServerSideUser";

// authentication middleware
const authenticatedRoute: RequestHandler<
  ExtendedRequestType,
  NextApiResponse
> = (req, res, next) => {
  const currentUser = req.session.get<ServerSideUser>("user");
  if (!currentUser) {
    res.status(403).end("403 Forbidden");
    return;
  }
  next();
};
export default authenticatedRoute;
