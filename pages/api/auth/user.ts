import createHandler from "lib/api/handler";

const handler = createHandler();

handler.get((req, res) => {
  const user = req.session.get("user");
  if (user) {
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

export default handler;
