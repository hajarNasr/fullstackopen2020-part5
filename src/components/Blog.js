import React, { useState } from "react";
import Togglable from "./Togglable";
import { updatePost, deletePost } from "../services/blogs";

const Blog = ({ blog, onDeleteBlog }) => {
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const increaseLikes = async () => {
    try {
      await updatePost(blog.id, { ...blog, likes: likes + 1 });
      setLikes(likes + 1);
    } catch (err) {
      console.log(err.response);
    }
  };

  const deleteBlogPost = async () => {
    if (window.confirm("You Sure you want to delete this post?")) {
      try {
        await deletePost(blog.id, blog.user.id);
        onDeleteBlog(blog.id);
      } catch (err) {
        console.log(err.response);
      }
    }
  };
  return (
    <div style={blogStyle}>
      <div>
        <p>Title: {blog.title}</p>
        <Togglable cancelBtnText="hide" showBtnText="view">
          <p>Author: {blog.author}</p>
          <p>
            URL: {blog.url} {likes}
            <button onClick={increaseLikes}>Like</button>
          </p>
          <button onClick={deleteBlogPost}>Remove</button>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
