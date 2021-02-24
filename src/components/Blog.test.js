import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog Tests", () => {
  let blogObj = {
    title: "Test 1",
    author: "Author 1",
    url: "url 1",
    likes: "10",
  };
  test("Only Tiltle and Author of a blog are displayed on first render", () => {
    const blog = render(<Blog blog={blogObj} />).container;
    const blogTogglableChildren = blog.querySelector(".togglable-children");

    expect(blog).toHaveTextContent("Title: Test 1");
    expect(blog).toHaveTextContent("Author: Author 1");
    expect(blogTogglableChildren).toHaveStyle("display:none");
  });

  test("Show URL and likes when the show button is clicked", () => {
    const blog = render(<Blog blog={blogObj} />).container;
    const blogTogglableChildren = blog.querySelector(".togglable-children");
    const showBtn = blog.querySelector(".show-btn");

    expect(showBtn).toHaveTextContent("view");
    expect(blogTogglableChildren).toHaveStyle("display:none");

    fireEvent.click(showBtn);

    expect(showBtn).toHaveTextContent("hide");
    expect(blogTogglableChildren).toHaveStyle("display:block");
  });
});
