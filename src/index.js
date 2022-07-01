const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

app.post('/users', (request, response) => {

  const { name, username } = request.body;
  
  // validating user
  const usernameExists = users.some( user => user.username === username);

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
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;