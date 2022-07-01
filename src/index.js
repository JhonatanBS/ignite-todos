const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// middleware
function checksExistsUserAccount(request, response, next) {

  const { username } = request.headers;

  const user = users.find( user => user.username === username);

  if(!user){
    return response.status(404).json({
      error: "User not finding!" // Usuário não encontrado
    })
  }

  request.user = user;

  return next();
  
}

app.post('/users', (request, response) => {

  const { name, username } = request.body;
  
  // validating user
  const usernameExists = users.find( user => user.username === username);

  if(usernameExists){
    return response.status(400).json({
      error : "This user already exists" // Este usuário já existe
    });
  }
  
  // Created user
  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  });

  response.status(201).json({
    message: "User created successfully!" // Usuário criado com sucesso
  , users});
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  
  const { user } = request;

  return response.status(200).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;

  const { user } = request;

  user.todos.push({
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  });

  return response.status(201).json({
    message: "Task created successfully", user
  })
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  
  const { title, deadline } = request.body;
  
  const { id } = request.params;

  const { user } = request;

  const todoCheckId = user.todos.find(todo => todo.id === id);

  if (!todoCheckId) {
    return response.status(404).json({ error: 'Todo not found' });
  }

  todoCheckId.title = title;
  todoCheckId.deadline = new Date(deadline);

  return response.status(200).json({
    message: "Updated todo successfully!", todoCheckId
  });

});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;