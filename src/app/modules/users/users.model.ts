import { Schema, model } from "mongoose";
import { UserType } from "./users.interface";

// Schema & Model
const userSchema = new Schema<UserType>(
    {
      individual_id: { type: Number, required: true, unique: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    },
    { timestamps: true }
  );
  export const User = model<UserType>("UserZZ", userSchema);