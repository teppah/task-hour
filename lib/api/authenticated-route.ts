import { RequestHandler } from "next-connect";
import { NextApiResponse } from "next";
import { ApiRequestType } from "./handler";
import ServerSideUser from "lib/user/ServerSideUser";

// authentication middleware
const authenticatedRoute: RequestHandler<ApiRequestType, NextApiResponse> = (
  req,
  res,
  next
) => {
  const currentUser = req.session.get<ServerSideUser>("user");
  if (!currentUser) {
    res.status(403).end("403 Forbidden");
    return;
  }
  next();
};
export default authenticatedRoute;
