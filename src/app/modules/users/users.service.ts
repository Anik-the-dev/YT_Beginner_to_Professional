import { UserType } from "./users.interface";
import { User } from "./users.model";
import { createUserId } from "./users.utils";


const createUser = async (user: UserType): Promise<UserType | null> =>{
    user.individual_id = await createUserId();
    const createdSingleUser = await User.create(user);
    if(!createdSingleUser){
        throw new Error("Failed to Create User")
    }
    return createdSingleUser
}

export default {
    createUser
}