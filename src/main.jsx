import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Post from "./pages/Post.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<App />} />
      <Route path="/post/:slug" element={<Post />} />
    </Routes>
  </BrowserRouter>
);
