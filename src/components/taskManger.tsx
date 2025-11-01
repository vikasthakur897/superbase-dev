import { useEffect, useState, type FormEvent } from "react";
import { supabaseClient } from "../superbase-client";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

// ✅ Add this interface for props
interface TaskManagerProps {
  logOut: () => void;
}

const TaskManager = ({ logOut }: TaskManagerProps) => {
  const [task, setTask] = useState({ title: "", description: "" });
  const [editDescription, setEditDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const { data, error } = await supabaseClient
      .from("task")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    }
    setTasks(data || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    setLoading(true);

    const { error } = await supabaseClient.from("task").insert([task]);
    if (error) {
      console.error("Error inserting task:", error.message);
    } else {
      setTask({ title: "", description: "" });
      fetchTasks();
    }
    setLoading(false);
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabaseClient.from("task").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const updateTask = async (id: number) => {
    if (!editDescription.trim()) return;

    const { error } = await supabaseClient
      .from("task")
      .update({ description: editDescription })
      .eq("id", id);

    if (error) {
      console.error("Error updating task:", error.message);
    } else {
      setEditDescription("");
      fetchTasks();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-lg">
      <div className="max-w-3xl mx-auto">
        {/* ✅ Add a header with Logout button */}
        <header className="flex items-center justify-between mb-6">
          <h4 className="text-[30px] font-bold text-gray-800">📝 Task Manager</h4>
          <div className="flex gap-3">
            <button
              onClick={fetchTasks}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Refresh
            </button>
            <button
              onClick={logOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Add Task Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-3"
        >
          <h2 className="text-lg font-semibold text-gray-700">Add New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea
            placeholder="Task Description"
            value={task.description}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            rows={3}
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found 😅</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-1 mb-4">
                  {task.description || "No description provided."}
                </p>

                <div className="space-y-2">
                  <textarea
                    placeholder="Edit description..."
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    rows={2}
                  ></textarea>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateTask(task.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Created: {new Date(task.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
