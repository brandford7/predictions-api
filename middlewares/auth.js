import config from "../middlewares/auth.js";

const verifyToken = async () => {
  const authHeader = request.headers.authorization;

  console.log(req);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default verifyToken;
