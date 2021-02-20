import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import AddPostsForm from "./components/AddPostsForm";
import Togglable from "./components/Togglable";
import { getAll } from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState(null);
  const formRef = useRef();

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
  const hideForm = () => {
    formRef.current();
  };

  const filterBlogs = (id) => setBlogs(blogs.filter((blog) => blog.id !== id));

  return (
    <div>
      {loggedinUser ? (
        <>
          <h2>blogs</h2>
          <h3>You're logged in as {loggedinUser.user.username}</h3>
          <button onClick={logout}>logout</button>
          <Togglable
            ref={formRef}
            cancelBtnText="Cancle"
            showBtnText="Add post"
          >
            <AddPostsForm
              blogs={blogs}
              setBlogs={setBlogs}
              hideForm={hideForm}
            />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={`${blog.title} ${blog.id}`}
                blog={blog}
                onDeleteBlog={filterBlogs}
              />
            ))}
        </>
      ) : (
        <LoginForm setUser={setLoggedinUser} />
      )}
    </div>
  );
};

export default App;
