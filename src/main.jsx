import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Post from "./pages/Post.jsx";
import BlogList from "./pages/BlogList.jsx";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<App />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/post/:slug" element={<Post />} />
    </Routes>
    <Analytics />
  </BrowserRouter>,
);
