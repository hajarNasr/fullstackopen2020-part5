import React, { useState } from "react";
import Togglable from "./Togglable";
import { updatePost, deletePost } from "../services/blogs";
import Notification from "./Notification";

const Blog = ({ blog, onDeleteBlog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [message, setMessage] = useState(null);

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
        setMessage({
          type: "success",
          content: "successfully deleted",
        });
        setTimeout(() => {
          setMessage(null);
          onDeleteBlog(blog.id);
        }, 2000);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setMessage({
            type: "error",
            content: "You can only delete your posts",
          });
          setTimeout(() => setMessage(null), 2000);
        }
      }
    }
  };
  return (
    <div style={blogStyle} className="blog-post">
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <Togglable cancelBtnText="hide" showBtnText="view">
        <p>
          URL: {blog.url} <span className="likes">{likes}</span>
          <button onClick={increaseLikes} id="like-btn">
            Like
          </button>
        </p>
        <button onClick={deleteBlogPost}>Remove</button>
      </Togglable>
      {message && <Notification msg={message} />}
    </div>
  );
};

export default Blog;
