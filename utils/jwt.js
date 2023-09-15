import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtLifetime,
  });
  return token;
};

export const isTokenValid = ({ token }) => jwt.verify(token, config.jwtSecret);

export const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: config.nodeEnv === "production",
    signed: true,
  });
};
