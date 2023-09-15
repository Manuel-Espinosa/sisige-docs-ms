import { tokenValidator } from '../../helpers/tokenValidator.js';

const verifyMe = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Sin token que comprobar' });
  }

  const decoded = await tokenValidator(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token invalido' });
  }

  // If the token is valid, attach the decoded data to the request object
  req.userId = decoded.user.userId;
  next();
};
 
export { verifyMe };
