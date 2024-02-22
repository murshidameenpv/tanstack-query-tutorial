import axios from "axios";

export const fetchPosts = async () => {
  const response = await axios.get("http://localhost:3000/posts");
  const data = response.data;
  return data;
};
export const fetchTags = async () => {
  const response = await axios.get("http://localhost:3000/tags");
  const data = response.data;
  return data;
};


export const addPost = async (newPost) => {
  const response = await axios.post("http://localhost:3000/posts", newPost);
  const data = response.data;
  return data;
};