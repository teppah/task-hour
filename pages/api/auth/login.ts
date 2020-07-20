import createHandler from "lib/api/handler";
import ClientSideUser from "lib/user/ClientSideUser";
import argon2 from "argon2";
import userHelper from "lib/api/user-helper";

const handler = createHandler<ClientSideUser>();

handler.post(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).end("400 Missing Fields");
    return;
  }
  const hashed = await argon2.hash(password);
  const foundUser = await userHelper.getUser(email, hashed);
  if (!foundUser) {
    res.status(404).end(`404 User Not Found`);
    return;
  }
  req.session.set("user", foundUser);
  await req.session.save();
  res.json({
    userId: foundUser.userId,
    username: foundUser.username,
    email: foundUser.email,
    isLoggedIn: true,
  });
});

export default handler;
