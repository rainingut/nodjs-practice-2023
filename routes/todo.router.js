import todoController from '../controllers/todos.controller.js';
import express from 'express';
const router = express.Router();


// Get All
router.get('/', 
/* 	#swagger.tags = ['Todos']
    #swagger.description = '取得所有代辦事項' */
/* #swagger.responses[200] = { 
    schema: [
    {
        "title": "這是預設資料",
        "complete": false,
        "id": "a934559c-5875-457c-a6fa-533a1d7f2d4a"
    }
    ]} */
todoController.getAllTodos);

// Get one Todo
router.get('/:id', todoController.getTodoById);

// Create Todo
router.post('/', 
/* #swagger.tags = ['Todos']
    #swagger.description = '新增 Todo' */
/* 
#swagger.parameters['obj'] = {
    in: 'body',
    description: 'Todo 內容',
    required: true,
    schema: {
    "title": "這是標題",
    "completed": false
    }
} */
/* #swagger.responses[200] = { 
    schema: {
        "title": "這是預設資料",
        "complete": false,
        "id": "a934559c-5875-457c-a6fa-533a1d7f2d4a"
    }
} */
todoController.createTodo);

// Update Todo
router.put('/:id', todoController.updateTodo);

// Delete Todo
router.delete('/:id', todoController.deleteTodo);

export default router;