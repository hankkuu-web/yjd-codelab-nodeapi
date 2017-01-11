const express = require('express');
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

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.listen(3000, () => {
  console.log(`Run at http://localhost:3000`)
});

module.exports = app;
