import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import "./TodoApp.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, text) => {
    setEditingTask({ id, text });
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, text: editingTask.text } : task
      )
    );
    setEditingTask(null);
  };

  return (
    <motion.div className="todo-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Advanced To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            className={task.completed ? "completed" : ""}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
          >
            {editingTask && editingTask.id === task.id ? (
              <input
                type="text"
                value={editingTask.text}
                onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
              />
            ) : (
              <span onClick={() => toggleTaskCompletion(task.id)}>{task.text}</span>
            )}
            <div className="buttons">
              {editingTask && editingTask.id === task.id ? (
                <button onClick={saveEdit}><FaCheck /></button>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => editTask(task.id, task.text)}><FaEdit /></button>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}><FaTrash /></button>
                </>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TodoApp;
