import nc, { ErrorHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { ironSession, Session } from "next-iron-session";

const session = ironSession({
  cookieName: "th-session",
  password: process.env.IRON_SESSION_PW,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

export type ApiRequestType = NextApiRequest & { session: Session };
const errorHandler: ErrorHandler<ApiRequestType, NextApiResponse> = (
  err,
  req,
  res,
  next
) => {
  console.error(JSON.stringify(err));
  res.status(500).end(`500 Internal Server Error: ${JSON.stringify(err)}`);
};

function createHandler<T = any>() {
  const handler = nc<ApiRequestType, NextApiResponse<T>>({
    onError: errorHandler,
  });
  handler.use(session);
  return handler;
}

export default createHandler;
