function TaskTable({ tasks, onDelete, onEdit }) {
    if (tasks.length === 0) {
        return <p>No tasks found.</p>;
    }

    return (
        <table className="task-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                            <button className="edit" onClick={() => onEdit(task.id)}>Edit</button>
                            <button className="delete" onClick={() => onDelete(task.id)}>Delete</button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TaskTable;
