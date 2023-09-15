import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { findUserByEmail } from "../../helpers/findUser.js";

const auth = async (req, res, next) => {
  try {
    // This could change according to the request from the front
    const email = req.body.email;

    // Using the user email to find it
    const user = await findUserByEmail(email);
    // Check if the password provided in the request matches the user's password
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Credenciales invalidas",
      });
    }
    // If the password is valid, create a JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set the token expiration time as per your requirements
    });

    // Return the JWT along with user details in the response
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export { auth };
