import React, { useEffect, useState } from "react";
import { getItems, addItem, deleteItem, updateItem } from "./api/api.js";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState(null);

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to fetch items from the API
  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

  // Function to add a new item
  const handleAddItem = async () => {
    if (newItem.trim() !== "") {
      try {
        const item = { note: newItem };
        await addItem(item);
        fetchItems();
        setNewItem("");
      } catch (error) {
        console.error("Failed to add item", error);
      }
    }
  };

  // Function to delete an item
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  // Function to update an item
  const handleUpdateItem = async (id) => {
    if (editItem && editItem.note.trim() !== "") {
      try {
        await updateItem(id, editItem);
        setEditItem(null);
        fetchItems();
      } catch (error) {
        console.error("Failed to update item", error);
      }
    }
  };

  // Function to handle change in the edit input
  const handleEditChange = (e) => {
    setEditItem({ ...editItem, note: e.target.value });
  };

  return (
    <div className="App">
      <h1>MY NOTES</h1>

      {/* Add New note */}
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={handleAddItem} disabled={!newItem.trim()}>
          Add
        </button>
      </div>

      {/* Display notes */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editItem?.id === item.id ? (
              <>
                <input
                  type="text"
                  value={editItem.note}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleUpdateItem(item.id)}>Save</button>
              </>
            ) : (
              <>
                {item.note}
                <button onClick={() => handleDeleteItem(item.id)}>
                  Delete
                </button>
                <button onClick={() => setEditItem({ ...item })}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
