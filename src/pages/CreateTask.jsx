import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "../components/TaskForm";

function CreateTask() {
  const navigate = useNavigate();

  const handleCreate = (taskData) => {
    const newTask = { id: uuidv4(), ...taskData };

    // Get existing tasks
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...storedTasks, newTask];

    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Redirect to Home
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Create New Task</h2>
      <TaskForm onSubmit={handleCreate} />
    </div>
  );
}

export default CreateTask;
