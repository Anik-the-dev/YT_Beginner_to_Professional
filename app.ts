// Fuly Typescript
import express, { Application, Response, Request } from "express";
import mongoose, { Schema, model, Document } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// express setup
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db setup
async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("App Connection Successful ");
  } catch (err) {
    console.log(`Error DB Connection`, err);
  }
}
bootstrap();

// Interface
interface UserType extends Document {
  individual_id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

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
const User = model<UserType>("UserZZ", userSchema);

// utility function
const createUserId = async (): Promise<number> => {
  const lastUser = await User.findOne({}, { individual_id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  const currentId = lastUser?.individual_id || 0;
  const incrementId = currentId + 1;
  return incrementId;
};

// route setup
app.get("/", (req: Request, res: Response) => {
  res.send("Working Fine");
});

// post route
app.post("/create", async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    user.individual_id = await createUserId();
    const result = await User.create(user);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User created Failed",
      error: error,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
