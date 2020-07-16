import createHandler from "lib/api/handler";

const handler = createHandler();

handler.post(async (req, res) => {
  const { username } = req.body;
  const user = { username, message: `Hi, ${username}!`, isLoggedIn: true };
  req.session.set("user", user);
  await req.session.save();
  res.json(user);
});

export default handler;
