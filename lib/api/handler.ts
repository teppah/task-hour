import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

function createHandler<T = any>() {
  const handler = nc<NextApiRequest, NextApiResponse<T>>();
  return handler;
}

export default createHandler;
