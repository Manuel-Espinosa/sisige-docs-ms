import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config()
//hashing password
const SALTROUNDS = parseInt(process.env.SALTROUNDS)
const hashPassword = async (password) => {

  const hashedPassword = await bcrypt.hash(password, SALTROUNDS)
  return hashedPassword;
}
export { hashPassword };