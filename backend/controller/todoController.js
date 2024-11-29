const Todo = require('../models/Log');

// Get all todos (accessible to both admin and user)
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).populate('user', 'email');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new todo (admin only)
const createTodo = async (req, res) => {
  const { text } = req.body;

  try {
    const newTodo = new Todo({
      text,
      user: req.user.id,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a todo (admin only)
const deleteTodo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
      console.error('Error in deleteTodo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports = { getTodos, createTodo, deleteTodo };
