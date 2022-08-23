import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";

const isAuthenticated: RequestHandler = (req, res, next) => {
  const token =
    req.cookies.token || req.headers.token?.toString().split(" ")[1];

  console.log({
    cookiesToken: req.cookies.token,
    headerToken: req.headers.token?.toString().split(" ")[1],
    cookies: req.cookies,
    headers: req.headers,
  });

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  //Decoding the token
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default isAuthenticated;
