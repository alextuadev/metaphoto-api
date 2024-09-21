import express from "express";
import cors from "cors";
import { getPhotos, getPhotoById } from "./controllers/photoController";

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/externalapi/photos", getPhotos);
app.get("/externalapi/photos/:id", getPhotoById);

export default app;
