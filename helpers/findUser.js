import { User } from "../schemas/user.js";

export const findUserByEmail = async (email) => {
    const user = await User.findOne({ email }).exec();
    if (user) {
      return user;
    }
    throw new Error(`No existe un usario con el email: ${email}`);
  };
  

export const findUserById = async (req, res) => {
    try {
      const userId = req.userId; // Get the user ID from the decoded token
  
      // Use the user ID to fetch the user information from the database
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Return the user information in the response
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const findAllUsers = async () => {
    const users = await User.find({ }).exec();
    if (users) {
      return users;
    }
    throw new Error(`No pudieron obtenerse los usuarios`);
  };
  