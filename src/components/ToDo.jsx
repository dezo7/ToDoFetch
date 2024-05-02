import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/dezouk');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const addTask = async () => {
    if (!task) return;
    try {
      const response = await fetch('https://playground.4geeks.com/todo/todos/dezouk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          label: task,
          is_done: false
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      fetchData();
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      fetchData();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h2>ToDo's</h2>
      <div className="todo-container">
        <ul>
          <li className="task-item">
            <input
              type="text"
              value={task}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Add task here..."
            />
          </li>
          {todos.map((item) => (
            <li key={item.id} className="task-item">
              {item.label}
              <i onClick={() => deleteTask(item.id)} className="fa fa-times" style={{ color: 'red' }}></i>
            </li>
          ))}
          <li></li>
          <div className="items-left">{todos.length} item left</div>
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;