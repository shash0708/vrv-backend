import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../Config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from './Logout'; // Import the LogoutButton

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role')?.trim();

  useEffect(() => {
    if (!userRole) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, [userRole, navigate]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${URL}/api/todos`, {
        withCredentials: true,
      });
      setTodos(response.data);
    } catch (err) {
      setError('Error fetching todos');
      toast.error('Error fetching todos');
    }
  };

  const addTodo = async () => {
    if (!newTodo) {
      setError('Todo cannot be empty');
      return;
    }
    try {
      const response = await axios.post(
        `${URL}/api/todos`,
        { text: newTodo },
        { withCredentials: true }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
      setError('');
      toast.success('Todo added successfully');
    } catch (err) {
      setError('Failed to add todo');
      toast.error('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${URL}/api/todos/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter(todo => todo._id !== id));
      toast.success('Todo deleted successfully');
    } catch (err) {
      setError('Failed to delete todo');
      toast.error('Failed to delete todo');
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <LogoutButton /> {/* Add the LogoutButton here */}
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">To-Do List</h2>

        <div className="mb-4 text-center">
          <p>Current User Role: {userRole || 'None'}</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {userRole === 'admin' && (
          <div className="mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Add a new task"
            />
            <button
              onClick={addTodo}
              className="w-full mt-2 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Todo
            </button>
          </div>
        )}

        <div className="space-y-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm group relative"
              >
                <span>{todo.text}</span>
                {(userRole === 'admin' || userRole === 'moderator')  && (
                  <div className="absolute right-4 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No todos available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
