import { useEffect, useState } from 'react'
import './App.css'
import { supabaseClient } from './superbase-client'

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}


function App() {
  const [task, setTask] = useState({ title: '', description: '' })
  const [editDescription, setEditDescription] = useState('')

  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    const { data, error } = await supabaseClient
      .from('task') 
      .select('*').order('created_at', { ascending: true })

    if (error) {
      console.log('Error fetching tasks:', error.message)
      return;
    } else {
      console.log('Tasks:', data)
      setTasks(data || [])
    }
  }

  useEffect(() => {
    fetchTasks()
  },[])

  console.log('Current tasks state:', tasks)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const { error } = await supabaseClient
      .from('task') 
      .insert([task]) 

    if (error) {
      console.log('Error inserting task:', error.message)
      return;
    } else {
      console.log('Task inserted successfully!')
      setTask({ title: '', description: '' })
    }
  }

  const deleteTask = async (id: number) => {
    

    const { error } = await supabaseClient
      .from('task') 
      .delete().eq('id', id)

    if (error) {
      console.log('Error deleting task:', error.message)
      return;
    } else {
      console.log('Task deleted successfully!')
      setTask({ title: '', description: '' })
      window.location.reload();
    }
  }

  const updateTask = async (id: number) => {
    

    const { error } = await supabaseClient
      .from('task') 
      .update({description: editDescription}).eq('id', id)

    if (error) {
      console.log('Error Updating task:', error.message)
      return;
    } else {
      console.log('Task Update successfully!')
      setTask({ title: '', description: '' })
      window.location.reload();
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

  {/* List of Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, key) => (
          <li
            key={key}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {/* <img src={task.image_url} style={{ height: 70 }} /> */}
              <div>
                <textarea
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "10px" }}
                  placeholder="Updated description..."
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button
                  style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
                  onClick={() => updateTask(task.id)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div> 
            </div>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
