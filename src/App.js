import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import AddPostsForm from "./components/AddPostsForm";
import { getAll } from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
    const loggedinUser = localStorage.getItem("loggedinUser");

    if (loggedinUser) {
      setLoggedinUser(JSON.parse(loggedinUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedinUser");
    setLoggedinUser(null);
  };

  return (
    <div>
      {loggedinUser ? (
        <>
          <h2>blogs</h2>
          <h3>You're logged in as {loggedinUser.user.username}</h3>
          <button onClick={logout}>logout</button>
          <AddPostsForm blogs={blogs} setBlogs={setBlogs} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <LoginForm setUser={setLoggedinUser} />
      )}
    </div>
  );
};

export default App;
