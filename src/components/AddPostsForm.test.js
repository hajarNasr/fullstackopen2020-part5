/* import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddPostsForm from "./AddPostsForm";

describe("Add New Posts Form", () => {
  let blogs = [
    {
      title: "Title 1",
      author: "Author 1",
      url: "url 1",
    },
    {
      title: "Title 2",
      author: "Author 2",
      url: "url 2",
    },
  ];
  test.only("Function should be called", () => {
    const mockFun = jest.fn();
    const component = render(<AddPostsForm hideForm={mockFun} />);

    const form = component.container.querySelector(".form");
    const title = component.container.querySelector(".title");
    const author = component.container.querySelector(".author");
    const url = component.container.querySelector(".url");

    fireEvent.change(title, {
      target: { value: "Title 3" },
    });

    fireEvent.change(author, {
      target: { value: "Author 3" },
    });

    fireEvent.change(url, {
      target: { value: "url 3" },
    });

    fireEvent.submit(form);
    expect(mockFun.mock.calls).toHaveLength(1);
  });
});
 */
