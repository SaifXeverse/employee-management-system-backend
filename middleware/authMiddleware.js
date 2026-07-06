import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.AccessToken;
  if (!token) {
    return res.status(401).json("No Token");
  }
  try {
    const decoded = jwt.verify(token, "tokenSecret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
};
