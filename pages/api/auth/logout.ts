import createHandler from "lib/api/handler";
import User from "lib/user/User";

const handler = createHandler<User>();

handler.get(async (req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false, username: null });
});

export default handler;
