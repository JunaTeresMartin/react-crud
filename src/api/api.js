import axios from "axios";

const API_URL = "https://react-crud-server-hgwj.onrender.com/mynotes";
// Fetch all notes
export const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new note
export const addItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

// Delete a note
export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Update a note
export const updateItem = async (id, updatedItem) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem);
  return response.data;
};
