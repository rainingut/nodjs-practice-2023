// https://stackoverflow.com/a/69059786
import supertest from 'supertest';
import app from '../app.js';
import TodosModel from '../models/todos.model.js';
const request = supertest(app);

let mockTodo;
// initialize
beforeEach(() => {
    TodosModel.todos = [
        { id: 1, title: 'apple', completed: false },
        { id: 2, title: 'banana', completed: true },
    ];
    mockTodo = TodosModel.todos[0];
});

// test
test('取得所有代辦事項', async() => {
    const res = await request.get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(TodosModel.todos);
});
test('透過 ID 取得特定待辦事項', async () => {
    const res = await request.get(`/todos/${mockTodo.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockTodo);
  });
test('新增一筆代辦事項', async() => {
    const newTodo = { title: '🐇', completed: false };
    const res = await request.post('/todos').send(newTodo);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(newTodo.title);
    expect(res.body.completed).toEqual(newTodo.completed);
});


test('更新特定待辦事項', async () => {
    const updatedTodo = { title: 'Updated Todo', completed: true };
    const res = await request.put(`/todos/${mockTodo.id}`).send(updatedTodo);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toEqual(updatedTodo.title);
    expect(res.body.completed).toEqual(updatedTodo.completed);
  });
  
  test('刪除特定待辦事項', async () => {
    const res = await request.delete(`/todos/${mockTodo.id}`);
    expect(res.statusCode).toBe(200);
    const deletedTodo = TodosModel.get(mockTodo.id);
    expect(deletedTodo).toBeUndefined();
  });
  
  // 錯誤流程測試
  test('透過不存在的 ID 取得待辦事項', async () => {
    const res = await request.get('/todos/non-existent-id');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Todo not found');
  });
  
  test('建立待辦事項但缺少標題', async () => {
    const newTodo = { completed: false };
    const res = await request.post('/todos').send(newTodo);
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('缺少 title 欄位');
  });