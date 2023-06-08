import mongoose from "mongoose";
import app from "./app";


// db setup
async function bootstrap() {
    try {
      await mongoose.connect(process.env.DATABASE_URL as string);
      console.log("Server Connection Successful ");
      app.listen(process.env.PORT, () => {
        console.log(`App is listening on port ${process.env.PORT}`);
      })
    } catch (err) {
      console.log(`Error DB Connection`, err);
    }
  }
  bootstrap();