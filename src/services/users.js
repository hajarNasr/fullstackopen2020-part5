import axios from "axios";
const baseUrl = "/api/users";

const addUser = (credentials) => {
  const request = axios.post(baseUrl, credentials);
  return request.then((response) => response.data);
};

export { addUser };
