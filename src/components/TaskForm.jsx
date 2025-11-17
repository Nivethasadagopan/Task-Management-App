import { useState, useEffect } from "react";

function TaskForm({ initialData = { title: "", description: "" }, onSubmit }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && initialData.title) {
      setFormData(initialData); // Only update when editing
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label>Title:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <button type="submit">Save Task</button>
    </form>
  );
}

export default TaskForm;
