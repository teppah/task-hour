import createHandler from "lib/api/handler";

const handler = createHandler();

handler.get(async (req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});

export default handler;
