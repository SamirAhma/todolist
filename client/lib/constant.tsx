export const baseUrl: string =
  process.env.NODE_ENV === "production"
    ? "https://todo-mern-shape.onrender.com"
    : "http://localhost:5000/api";
