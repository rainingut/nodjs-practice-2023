import todoController from '../controllers/todos.controller.js';
import express from 'express';
const router = express.Router();


// Get All
router.get('/', todoController.getAllTodos);

// Get one Todo
router.get('/:id', todoController.getTodoById);

// Create Todo
router.post('/', todoController.createTodo);

// Update Todo
router.put('/:id', todoController.updateTodo);

// Delete Todo
router.delete('/:id', todoController.deleteTodo);

export default router;