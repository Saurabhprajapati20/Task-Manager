import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDeleteTask, onEditTask }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDeleteTask={onDeleteTask} 
          onEditTask={onEditTask} 
        />
      ))}
    </div>
  );
}

export default TaskList;
