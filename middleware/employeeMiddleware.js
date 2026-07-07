import jwt from "jsonwebtoken";

export const verifyTokenEmployee = (req, res, next) => {
  const token = req.cookies.AccessTokenEmployee;
  if (!token) {
    return res.status(401).json("No Token");
  }
  try {
    const decoded = jwt.verify(token, "tokenSecretEmployee");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
};
