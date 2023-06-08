// Here we setup the express
import express, { Application, Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./app/modules/users/users.route";
dotenv.config();

// express setup
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the route
app.use('/api/v1/users/', router)

// route setup
app.get("/", (req: Request, res: Response) => {
    res.send("Working Fine");
  });

export default app  