import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { ironSession, Session } from "next-iron-session";

const session = ironSession({
  cookieName: "th-session",
  password: process.env.IRON_SESSION_PW,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

function createHandler<T = any>() {
  console.log(process.env.IRON_SESSION_PW);
  const handler = nc<
    NextApiRequest & { session: Session },
    NextApiResponse<T>
  >();
  handler.use(session);
  return handler;
}

export default createHandler;
