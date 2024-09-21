import express from "express";
import { getPhotos, getPhotoById } from "./controllers/photoController";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/externalapi/photos", getPhotos);
app.get("/externalapi/photos/:id", getPhotoById);

export default app;
