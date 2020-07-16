import createHandler from "lib/api/handler";
import User from "lib/user/User";

const handler = createHandler<User>();

handler.post(async (req, res) => {
  const { username } = req.body;
  const user = { username, isLoggedIn: true };
  req.session.set("user", user);
  await req.session.save();
  res.json(user);
});

export default handler;
