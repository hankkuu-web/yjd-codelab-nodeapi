const models = require('../../models');

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


const show = (req, res)=> {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const user = users.filter(user => user.id.toString() === req.params.id)[0];
  if (!user) return res.status(404).end();

  res.json(user);
};

const index = (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) return res.status(400).send();

  const offset = parseInt(req.query.offset, 10);
  if (Number.isNaN(offset)) return res.status(400).end();

  models.User.findAll({
    offset: offset,
    limit: limit,
    order: 'id asc'
  }).then(users => res.json(users));

  // res.json(users.filter((user, idx) => idx >= offset && idx < offset + limit));
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  users = users.filter(user => user.id !== id);
  res.status(204).end();
};

const create = (req, res) => {
  const name = req.body.name;
  if (!name || !name.length) return res.status(400).end();

  const isConflict = users.filter(user => user.name === name).length > 0;
  if (isConflict) return res.status(409).end();

  const id = users.reduce((id, user) => id > user.id ? id : user.id, 0) + 1;
  const user = {id, name}

  users.push(user);
  res.status(201).json(user);
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();
  const foundName = users.some(user => user.name === name);
  if (foundName) return res.status(409).end();

  const user = users.filter(user => user.id === id)[0];
  if (!user) return res.status(404).end();

  user.name = name;
  res.json(user);
};

module.exports = {index, show, update, create, destroy};
