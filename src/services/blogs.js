import axios from "axios";
const baseUrl = "/api/posts";

const getToken = () => {
  const loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));
  return `bearer ${loggedinUser.token}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addNewPost = (newPost) => {
  const config = {
    headers: { Authorization: getToken() },
  };
  const request = axios.post(baseUrl, newPost, config);
  return request.then((response) => response.data);
};
export { getAll, addNewPost };
