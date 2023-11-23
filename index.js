import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function verifyJWT(req, res, next) {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(401).send({ isLoggedIn: false });
  }

  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({ isLoggedIn: false });
    }
    req.user = user;
  });
  next();
}

export default verifyJWT;
