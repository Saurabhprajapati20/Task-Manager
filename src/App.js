import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Error parsing stored tasks:', error);
        // If parsing fails, clear corrupted data
        localStorage.removeItem('tasks');
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);

  useEffect(() => {
  if (tasks.length === 0) {
    localStorage.removeItem('tasks'); // CLEAN storage
  } else {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id 
        ? { ...updatedTask, updatedAt: new Date().toISOString() } 
        : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Organize your tasks efficiently</p>
      </header>
      <main className="app-main">
        <TaskForm 
          onAddTask={addTask} 
          onUpdateTask={updateTask} 
          editingTask={editingTask} 
          setEditingTask={setEditingTask}
        />
        <TaskList 
          tasks={tasks} 
          onDeleteTask={deleteTask} 
          onEditTask={startEditing} 
        />
      </main>
    </div>
  );
}

export default App;
