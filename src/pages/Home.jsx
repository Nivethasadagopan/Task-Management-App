import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskTable from "../components/TaskTable";
import Pagination from "../components/Pagination";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const navigate = useNavigate();

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Filtered + paginated tasks
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Delete task
  const handleDelete = (id) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  // Navigate to edit
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => navigate("/create")}>+ Add Task</button>
      </div>

      <TaskTable tasks={currentTasks} onDelete={handleDelete} onEdit={handleEdit} />
      <Pagination
        totalItems={filteredTasks.length}
        itemsPerPage={tasksPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Home;
