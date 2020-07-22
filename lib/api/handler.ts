import nc, { ErrorHandler, RequestHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { ironSession, Session } from "next-iron-session";

const session = ironSession({
  cookieName: "th-session",
  password: process.env.IRON_SESSION_PW,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

export type ExtendedRequestType = NextApiRequest & { session: Session };
export type ExtendedResponseType<T = any> = NextApiResponse<T> & {
  notFound: () => void;
};

const errorHandler: ErrorHandler<ExtendedRequestType, NextApiResponse> = (
  err,
  req,
  res,
  next
) => {
  console.error(JSON.stringify(err));
  res.status(500).end(`500 Internal Server Error: ${JSON.stringify(err)}`);
};

const extendedRequest: RequestHandler<
  ExtendedRequestType,
  ExtendedResponseType
> = (req, res, next) => {
  res.notFound = () => res.status(404).end("404 Not Found");
  next();
};

function createHandler<T = any>() {
  const handler = nc<ExtendedRequestType, ExtendedResponseType<T>>({
    onError: errorHandler,
  });
  handler.use(session);
  handler.use(extendedRequest);
  return handler;
}

export default createHandler;
