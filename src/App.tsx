
import { useState } from 'react'
import './App.css'

function App() {

  const [task , setTask] = useState({ title: '', description: '', image: null })

  return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>

      {/* Form to add a new task */}
      <form  style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Task Description"
         
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />

        <input type="file" accept="image/*"  />

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Task
        </button>
      </form>

      {/* List of Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
       
          <li
            
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <h3>title</h3>
              <p>description</p>
              <img src='' style={{ height: 70 }} />
              <div>
                <textarea
                  placeholder="Updated description..."
                  onChange={() => {}}
                />
                <button
                  style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
                  onClick={() => {}}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={() => {}}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
    
      </ul>
    </div>
  )
}

export default App
