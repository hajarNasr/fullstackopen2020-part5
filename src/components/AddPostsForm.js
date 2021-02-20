import React, { useState } from "react";
import { addNewPost } from "../services/blogs";
import Notification from "./Notification";

const AddPostsForm = ({ blogs, setBlogs, hideForm }) => {
  const initialPost = { title: "", author: "", url: "" };
  const [post, setPost] = useState(initialPost);
  const [error, setError] = useState(null);

  const handleAddingNewPosts = async (e) => {
    e.preventDefault();
    try {
      const newPost = await addNewPost(post);
      setBlogs([...blogs, newPost]);
      setPost(initialPost);
      hideForm();
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => setError(null), 2000);
    }
  };
  return (
    <>
      <form onSubmit={handleAddingNewPosts}>
        <input
          placeholder="title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <input
          placeholder="author"
          value={post.author}
          onChange={(e) => setPost({ ...post, author: e.target.value })}
        />
        <input
          placeholder="url"
          value={post.url}
          onChange={(e) => setPost({ ...post, url: e.target.value })}
        />
        <button>Create</button>
      </form>
      {error && <Notification msg={{ type: "error", content: error }} />}
    </>
  );
};

export default AddPostsForm;
