import { useState } from 'react'
import './App.css'
import { supabaseClient } from './superbase-client'

function App() {
  const [task, setTask] = useState({ title: '', description: '' })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const { error } = await supabaseClient
      .from('task') 
      .insert([task]) 

    if (error) {
      console.log('Error inserting task:', error.message)
    } else {
      console.log('Task inserted successfully!')
      setTask({ title: '', description: '' })
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => setTask((prev) => ({ ...prev, description: e.target.value }))}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Task
        </button>
      </form>
    </div>
  )
}

export default App
