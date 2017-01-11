const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// 임시데이터
let users = [{
  id: 1,
  name: 'Alice'
}, {
  id: 2,
  name: 'Bek'
}, {
  id: 3,
  name: 'Chris'
}];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users/:id', (req, res)=> {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const user = users.filter(user => user.id.toString() === req.params.id)[0];
  if (!user) return res.status(404).end();

  res.json(user);
});

app.get('/users', (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) return res.status(400).send();

  const offset = parseInt(req.query.offset, 10);
  if (Number.isNaN(offset)) return res.status(400).end();

  res.json(users.filter((user, idx) => idx >= offset && idx < offset + limit));
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  users = users.filter(user => user.id !== id);
  res.status(204).end();
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  if (!name || !name.length) return res.status(400).end();

  const isConflict = users.filter(user => user.name === name).length > 0;
  if (isConflict) return res.status(409).end();

  const id = users.reduce((id, user) => id > user.id ? id : user.id, 0) + 1;
  const user = {id, name}

  users.push(user);
  res.status(201).json(user);
});

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.listen(3000, () => {
  console.log(`Run at http://localhost:3000`)
});

module.exports = app;
