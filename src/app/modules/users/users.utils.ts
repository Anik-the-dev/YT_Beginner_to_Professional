import { User } from "./users.model";

export const createUserId = async (): Promise<number> => {
    const lastUser = await User.findOne({}, { individual_id: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean();
    const currentId = lastUser?.individual_id || 0;
    const incrementId = currentId + 1;
    return incrementId;
  };