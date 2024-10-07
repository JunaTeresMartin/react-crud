import React, { useEffect, useState } from "react";
import { getItems, addItem, deleteItem, updateItem } from "./api/api";
import './App.css';


function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState(null);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleAddItem = async () => {
    if (newItem.trim() !== "") {
      const item = { name: newItem };
      await addItem(item);
      fetchItems();
      setNewItem("");
    }
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  const handleUpdateItem = async (id) => {
    if (editItem.name.trim() !== "") {
      await updateItem(id, editItem);
      setEditItem(null);
      fetchItems();
    }
  };

  const handleEditChange = (e) => {
    setEditItem({ ...editItem, name: e.target.value });
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
        <button onClick={handleAddItem}>Add</button>
      </div>

      {/* Display notes */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editItem?.id === item.id ? (
              <>
                <input
                  type="text"
                  value={editItem.name}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleUpdateItem(item.id)}>Save</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                <button onClick={() => setEditItem(item)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
