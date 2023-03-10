import { withSessionRoute } from "../../lib/config/withSession";
import { authenticateUser } from "../../utils/auth";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
  const { emailAddress, password } = req.body;

  // Check if email and password are valid
  const isValid = await authenticateUser(emailAddress, password);
  if (!isValid) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }
  await req.session.save();
  res.send({ ok: true });
}
