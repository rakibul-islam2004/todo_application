import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt = require("jsonwebtoken");
import config from "../../config";

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return false;
  }

  const secret = config.jwtSecret as string;

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    secret,
    {
      expiresIn: "7d",
    }
  );
  console.log({ token });
  return { token, user };
};

export const authServices = {
  loginUser,
};
