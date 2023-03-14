import { withSessionRoute } from "../../lib/config/withSession";

export default withSessionRoute(logout);

async function logout(req, res, session) {
  await req.session.destroy();
  res.send({ ok: true });
}
