export const baseUrl: string = (process.env.PRODUCTION = true
  ? "https://todo-mern-shape.onrender.com/api"
  : "http://localhost:5000/api");
