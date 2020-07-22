import createHandler from "lib/api/handler";
import ClientSideUser from "lib/shared/user/ClientSideUser";

const handler = createHandler<ClientSideUser>();

handler.get(async (req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false, username: null, email: null, userId: null });
});

export default handler;
