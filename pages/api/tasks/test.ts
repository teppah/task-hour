import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>().get((req, res) => {
  res.send("hi");
});

export default handler;
