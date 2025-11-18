import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js";

const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) return res.status(403).json({ error: "User is not authorized" });
  next();
};

const isAdmin = (req, res, next) => {
  if (req.auth && req.auth.role === "admin") next();
  else return res.status(403).json({ error: "Admin access required" });
};

export default { requireSignin, hasAuthorization, isAdmin };
