import createHandler from "lib/api/handler";
import User from "lib/user/User";

const handler = createHandler<User>();

handler.get((req, res) => {
  const user = req.session.get("user");
  if (user) {
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({ isLoggedIn: false, username: null });
  }
});

export default handler;
