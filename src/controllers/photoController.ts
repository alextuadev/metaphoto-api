import { Request, Response } from "express";
import {
  getEnrichedPhotos,
  getEnrichedPhotoById,
} from "../services/apiService";
import { FilterOptions } from "../interfaces/interfaces";

export async function getPhotos(req: Request, res: Response) {
  try {
    const filters: FilterOptions = {
      title: req.query.title as string,
      "album.title": req.query["album.title"] as string,
      "album.user.email": req.query["album.user.email"] as string,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      offset: req.query.offset
        ? parseInt(req.query.offset as string)
        : undefined,
    };

    const photos = await getEnrichedPhotos(filters);
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching photos" });
  }
}

export async function getPhotoById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const photo = await getEnrichedPhotoById(id);

    if (photo) {
      res.json(photo);
    } else {
      res.status(404).json({ error: "Photo not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "A error occurred while fetching the photo" });
  }
}
