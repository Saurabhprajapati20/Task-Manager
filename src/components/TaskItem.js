import React from 'react';

function TaskItem({ task, onDeleteTask, onEditTask }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <div className="task-meta">
          <span className="task-date">Created: {formatDate(task.createdAt)}</span>
          {task.updatedAt !== task.createdAt && (
            <span className="task-date">Updated: {formatDate(task.updatedAt)}</span>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button className="btn btn-edit" onClick={() => onEditTask(task)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
