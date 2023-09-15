import Term from "../schemas/term.js";

export const findCurrentTerm = async () => {
  try {
    const currentTerm = await Term.findOne({ status: "active" })
      .sort({ created_at: -1 })
      .exec();
    return currentTerm ? currentTerm : null;
  } catch (error) {
    throw error;
  }
};

export const deleteCurrentTerm = async () => {
  try {
    const currentTerm = await findCurrentTerm();
    
    if (!currentTerm) {
      return "No Term to delete";
    }
    
    currentTerm.status = "unactive";
    await currentTerm.save();
    
    return currentTerm.term;
  } catch (error) {
    throw error;
  }
};
