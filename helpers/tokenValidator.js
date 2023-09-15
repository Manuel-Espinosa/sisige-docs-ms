import jwt from "jsonwebtoken";

const tokenValidator = async (tokenToValidate) => {
  try {
    const decoded = await jwt.verify(tokenToValidate, process.env.JWT_SECRET);
    return {decoded:true,user:decoded};
  } catch (err) {
    return false;
  }
};

export { tokenValidator };
