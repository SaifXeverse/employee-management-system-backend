import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Access Denied");
  }

  try {
    const decode = jwt.verify(token, "tokenSecret");
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json("Invalid Token");
  }
};
