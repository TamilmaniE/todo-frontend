import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('http://localhost:3006/todo').then(res => {
      setTodos(res.data);
    });
  };

  const addTodo = () => {
    axios.post('http://localhost:3006/todo', { title: input }).then(() => {
      setInput('');
      fetchTodos();
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3006/todo/${id}`).then(() => fetchTodos());
  };

  const toggleComplete = (id, completed) => {
    axios.patch(`http://localhost:3006/todo/${id}`, { completed: !completed })
      .then(() => fetchTodos());
  };

  return (
    <div className="container">
      <h1>📝 My Todo App</h1>

      <div className="todo-input">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Add your task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(todo._id, todo.completed)}>
              {todo.title}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
