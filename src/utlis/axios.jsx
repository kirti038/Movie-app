import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTdjZWMwZTFiYWFmYzAwMjU3ODUwYjRhOThiZjMwOCIsIm5iZiI6MTcyMzE1MDUyNC40NTEyNywic3ViIjoiNjZiNDk3Y2U3MDY0MDg1MDg0MmIzM2UxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Xh4Aik_KDPhn1dK0tHTwP7PS7QR12jBK8HdudWlIL4E",
  },
});

export default instance;
