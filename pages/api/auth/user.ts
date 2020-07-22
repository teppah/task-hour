import createHandler from "lib/api/handler";
import ClientSideUser from "lib/shared/user/ClientSideUser";
import userHelper from "lib/api/user-helper";

const handler = createHandler<ClientSideUser>();

handler.get(async (req, res) => {
  const user = req.session.get<ClientSideUser>("user");
  if (!user) {
    res.json({
      isLoggedIn: false,
      username: null,
      email: null,
      userId: null,
    });
    return;
  }
  // TODO: evaluate whether to do a database lookup here to retrieve the latest data about user
  // or not
  // should this always return fresh data (in the cookie)?
  // or should it always query db for fresh data? (reactivity)
  const foundUser = await userHelper.getUserById(user.userId);
  if (foundUser) {
    req.session.set("user", foundUser);
    await req.session.save();
    res.json({
      userId: foundUser.userId,
      username: foundUser.username,
      email: foundUser.email,
      isLoggedIn: true,
    });
  } else {
    // shouldn't happen, throw 500
    // TODO: investigate whether there is a better auth flow
    req.session.destroy();
    res.status(500).end("500 Internal Authentication Error");
  }
});

export default handler;
