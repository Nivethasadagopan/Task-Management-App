import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";

function EditTask() {
  const { id } = useParams(); // get task ID from URL
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  // Load the task to edit
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const foundTask = storedTasks.find((t) => t.id === id);
    if (foundTask) {
      setTask(foundTask);
    } else {
      alert("Task not found!");
      navigate("/");
    }
  }, [id, navigate]);

  const handleUpdate = (updatedData) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.map((t) =>
      t.id === id ? { ...t, ...updatedData } : t
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Task</h2>
      <TaskForm initialData={task} onSubmit={handleUpdate} />
    </div>
  );
}

export default EditTask;
