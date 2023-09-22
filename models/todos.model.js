import { v4 as uuidv4 } from 'uuid';

class TodoModel {
  todos = [];
  constructor() {
    this.todos = [
      {
        title: '這是預設資料',
        completed: false,
        id: uuidv4(),
      },
    ];
  }

  getAll() {
    return this.todos;
  }

  get(id) {
    return this.todos.find((todo) => String(todo.id) === String(id));
  }

  create(todo) {
    const newTodo = {
      ...todo,
      id: uuidv4(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id, updatedFields) {
    const todo = this.get(id);
    if (todo) {
      Object.assign(todo, updatedFields);
    }
    return todo;
  }

  delete(id) {
    const index = this.todos.findIndex((todo) => String(todo.id) === String(id));
    if (index !== -1) {
      return this.todos.splice(index, 1)[0];
    }
  }
}

export default new TodoModel();