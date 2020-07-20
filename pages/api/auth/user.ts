import createHandler from "lib/api/handler";
import ClientSideUser from "lib/user/ClientSideUser";

const handler = createHandler<ClientSideUser>();

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
