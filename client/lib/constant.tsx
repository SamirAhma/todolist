import React from "react";

const MyComponent = () => {
  const baseUrl =
    process.env.PRODUCTION === "production"
      ? "https://todo-mern-shape.onrender.com/api"
      : "http://localhost:5000/api";

  // Your component code goes here
};

export default MyComponent;
