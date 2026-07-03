import bcrypt from "bcrypt";
import { findUserEmail, createUser, getAllUsers } from "../models/authModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await findUserEmail(email);

    if (user.length) {
      return res.status(409).json("User already exists");
    }

    const hash = await bcrypt.hash(password, 10);

    await createUser({
      name,
      email,
      password: hash,
    });

    res.status(200).json("Registered Successfully");
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findUserEmail(email);

    if (!user.length) {
      return res.status(404).json("User not found");
    }

    const check = await bcrypt.compare(password, user[0].password);

    if (!check) {
      return res.status(401).json("Wrong Password");
    }

    const token = jwt.sign(
      {
        id: user[0].id,
      },
      "tokenSecret",
      { expiresIn: "24h" },
    );

    const { password: pass, ...others } = user[0];

    res.cookie("AccessToken", token, {
      httpOnly: true,
    });
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const logout = (req, res) => {
  res.clearCookie("AccessToken", {
    httpOnly: true,
  });

  return res.status(200).json("User is logout");
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};