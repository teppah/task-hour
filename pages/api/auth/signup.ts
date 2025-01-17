import createHandler from "lib/api/handler";
import ClientSideUser from "lib/shared/user/ClientSideUser";
import argon2 from "argon2";
import ServerSideUser from "lib/shared/user/ServerSideUser";
import { nanoid } from "nanoid";
import userHelper from "lib/api/user-helper";

const handler = createHandler<ClientSideUser>();

handler.post(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).end("400 Missing Fields");
    return;
  }
  const hashed = await argon2.hash(password);
  const toCreate: ServerSideUser = {
    userId: nanoid(12),
    username,
    email,
    passwordHash: hashed,
  };
  const created = await userHelper.createUser(toCreate);
  req.session.set("user", created);
  await req.session.save();
  res.json({
    username: created.username,
    userId: created.userId,
    email: created.email,
    isLoggedIn: true,
  });
});

export default handler;
