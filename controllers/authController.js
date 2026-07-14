import bcrypt from "bcrypt";
import { findUserEmail, createUser, getDBUser, updateDBUser } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import { getIO } from "../socket.js";

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!gmailRegex.test(email)) {
      return res.status(400).json("Only @gmail.com are allowed.");
    }

    if (!password || password.length < 6) {
      return res.status(400).json("Password must be at least 6 characters long.");
    }

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
    const { email, password } = req.body;
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
      { expiresIn: "1h" },
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

export const checkUser = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const getUser = async (req, res) => {
  try {
    const user = await getDBUser(req.user.id);
    const { password: pass, ...others } = user[0];

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const updateUser = async (req, res) => {
  try {
     const id = req.user.id;
     const {email} = req.body;

     if (!gmailRegex.test(email)) {
      return res.status(400).json("Only @gmail.com are allowed.");
    }

     const result = await updateDBUser(id, req.body)

     getIO().emit("userProfileUpdate", {
      id,
      ...req.body
     })

     res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error + "error")
  }
}