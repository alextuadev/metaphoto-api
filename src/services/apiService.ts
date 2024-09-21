import axios from "axios";
import {
  User,
  Album,
  Photo,
  EnrichedPhoto,
  FilterOptions,
} from "../interfaces/interfaces";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers(): Promise<User[]> {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
}

export async function getAlbums(): Promise<Album[]> {
  const response = await axios.get(`${BASE_URL}/albums`);
  return response.data;
}

export async function getPhotos(): Promise<Photo[]> {
  const response = await axios.get(`${BASE_URL}/photos`);
  return response.data;
}

export async function getEnrichedPhotos(
  filters: FilterOptions
): Promise<EnrichedPhoto[]> {
  const [users, albums, photos] = await Promise.all([
    getUsers(),
    getAlbums(),
    getPhotos(),
  ]);

  let enrichedPhotos = photos.map((photo) => {
    const album = albums.find((a) => a.id === photo.albumId);
    const user = users.find((u) => u.id === album?.userId);
    return {
      ...photo,
      album: { ...album, user } as Album & { user: User },
    } as EnrichedPhoto;
  });

  // Apply filters
  if (filters.title) {
    enrichedPhotos = enrichedPhotos.filter((photo) =>
      photo.title.toLowerCase().includes(filters.title!.toLowerCase())
    );
  }
  if (filters["album.title"]) {
    enrichedPhotos = enrichedPhotos.filter((photo) =>
      photo.album.title
        .toLowerCase()
        .includes(filters["album.title"]!.toLowerCase())
    );
  }
  if (filters["album.user.email"]) {
    enrichedPhotos = enrichedPhotos.filter(
      (photo) =>
        photo.album.user.email.toLowerCase() ===
        filters["album.user.email"]!.toLowerCase()
    );
  }

  // Apply pagination
  const offset = filters.offset || 0;
  const limit = filters.limit || 25;
  return enrichedPhotos.slice(offset, offset + limit);
}

export async function getEnrichedPhotoById(
  id: number
): Promise<EnrichedPhoto | null> {
  const [users, albums, photos] = await Promise.all([
    getUsers(),
    getAlbums(),
    getPhotos(),
  ]);

  const photo = photos.find((p) => p.id === id);
  if (!photo) return null;

  const album = albums.find((a) => a.id === photo.albumId);
  const user = users.find((u) => u.id === album?.userId);

  return {
    ...photo,
    album: { ...album, user } as Album & { user: User },
  } as EnrichedPhoto;
}
