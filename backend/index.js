import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app, httpServer } from "./app.js"; // Import the app and httpServer

dotenv.config();

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    

    httpServer.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });
